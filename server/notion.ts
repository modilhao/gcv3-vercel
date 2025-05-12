import { Client } from "@notionhq/client";

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN || '',
});

// Extract the page ID from the Notion page URL
function extractPageIdFromUrl(pageUrl: string): string {
  const match = pageUrl.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }

  throw Error("Failed to extract page ID");
}

// Get the database ID from environment variables
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

/**
 * Fetch all published posts from the Notion database
 */
export async function getPosts() {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Created time",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: any) => {
      // Extract post data from the Notion page
      const { properties } = page;
      
      // Get title
      const title = properties.Title?.title?.[0]?.plain_text || "Untitled";
      
      // Get slug
      const slug = properties.Slug?.rich_text?.[0]?.plain_text || page.id;
      
      // Get cover image URL
      const coverURL = properties.Cover?.url || 
                       properties.Cover?.files?.[0]?.file?.url ||
                       properties.Cover?.files?.[0]?.external?.url ||
                       page.cover?.external?.url ||
                       page.cover?.file?.url ||
                       null;
      
      // Get tags
      const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
      
      // Get excerpt
      const excerpt = properties.Excerpt?.rich_text?.[0]?.plain_text || null;
      
      return {
        id: page.id,
        title,
        slug,
        cover: coverURL,
        published: properties.Published?.checkbox || false,
        tags,
        excerpt,
        createdAt: page.created_time,
        updatedAt: page.last_edited_time,
      };
    });
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    throw new Error("Failed to fetch posts from Notion");
  }
}

/**
 * Fetch a single post by slug from the Notion database
 */
export async function getPostBySlug(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (!response.results.length) {
      return null;
    }

    const page = response.results[0];
    const { properties } = page as any;
    
    // Get title
    const title = properties.Title?.title?.[0]?.plain_text || "Untitled";
    
    // Get cover image URL
    const coverURL = properties.Cover?.url || 
                     properties.Cover?.files?.[0]?.file?.url ||
                     properties.Cover?.files?.[0]?.external?.url ||
                     page.cover?.external?.url ||
                     page.cover?.file?.url ||
                     null;
    
    // Get tags
    const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
    
    // Get excerpt
    const excerpt = properties.Excerpt?.rich_text?.[0]?.plain_text || null;
    
    // Fetch the page content blocks
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
    });

    // Transform blocks into markdown
    const content = await blocksToMarkdown(blocks.results);

    return {
      id: page.id,
      title,
      slug,
      cover: coverURL,
      published: properties.Published?.checkbox || false,
      tags,
      excerpt,
      content,
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw new Error("Failed to fetch post by slug");
  }
}

/**
 * Transform Notion blocks into markdown text
 */
async function blocksToMarkdown(blocks: any[]): Promise<string> {
  let markdown = '';

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        markdown += paragraphToMarkdown(block.paragraph) + '\n\n';
        break;
      case 'heading_1':
        markdown += `# ${richTextToMarkdown(block.heading_1.rich_text)}\n\n`;
        break;
      case 'heading_2':
        markdown += `## ${richTextToMarkdown(block.heading_2.rich_text)}\n\n`;
        break;
      case 'heading_3':
        markdown += `### ${richTextToMarkdown(block.heading_3.rich_text)}\n\n`;
        break;
      case 'bulleted_list_item':
        markdown += `- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}\n`;
        break;
      case 'numbered_list_item':
        markdown += `1. ${richTextToMarkdown(block.numbered_list_item.rich_text)}\n`;
        break;
      case 'to_do':
        const checked = block.to_do.checked ? '[x]' : '[ ]';
        markdown += `${checked} ${richTextToMarkdown(block.to_do.rich_text)}\n`;
        break;
      case 'toggle':
        markdown += `<details><summary>${richTextToMarkdown(block.toggle.rich_text)}</summary>\n\n`;
        if (block.has_children) {
          const children = await notion.blocks.children.list({
            block_id: block.id,
          });
          markdown += await blocksToMarkdown(children.results);
        }
        markdown += '</details>\n\n';
        break;
      case 'child_page':
        markdown += `[${block.child_page.title}](${block.id})\n\n`;
        break;
      case 'image':
        const imageUrl = block.image.type === 'external' 
          ? block.image.external.url 
          : block.image.file.url;
        const imageCaption = block.image.caption.length 
          ? block.image.caption[0].plain_text 
          : '';
        markdown += `![${imageCaption}](${imageUrl})\n\n`;
        break;
      case 'divider':
        markdown += '---\n\n';
        break;
      case 'quote':
        markdown += `> ${richTextToMarkdown(block.quote.rich_text)}\n\n`;
        break;
      case 'code':
        markdown += `\`\`\`${block.code.language}\n${richTextToMarkdown(block.code.rich_text)}\n\`\`\`\n\n`;
        break;
      default:
        // Handle unsupported blocks as plain text or skip
        if (block[block.type]?.rich_text) {
          markdown += richTextToMarkdown(block[block.type].rich_text) + '\n\n';
        }
    }
  }

  return markdown;
}

function paragraphToMarkdown(paragraph: any): string {
  if (!paragraph.rich_text || paragraph.rich_text.length === 0) {
    return '';
  }
  return richTextToMarkdown(paragraph.rich_text);
}

function richTextToMarkdown(richText: any[]): string {
  if (!richText || richText.length === 0) {
    return '';
  }
  
  return richText.map(text => {
    let content = text.plain_text;
    
    if (text.annotations.bold) {
      content = `**${content}**`;
    }
    if (text.annotations.italic) {
      content = `*${content}*`;
    }
    if (text.annotations.strikethrough) {
      content = `~~${content}~~`;
    }
    if (text.annotations.code) {
      content = `\`${content}\``;
    }
    if (text.annotations.underline) {
      // Markdown doesn't have underline, using HTML
      content = `<u>${content}</u>`;
    }
    
    if (text.href) {
      content = `[${content}](${text.href})`;
    }
    
    return content;
  }).join('');
}
