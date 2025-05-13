import { Client } from "@notionhq/client";

// Carregar variáveis de ambiente do arquivo .env
const NOTION_TOKEN = process.env.NOTION_TOKEN || '';

// Extrair o ID do banco de dados da URL da página
function extractDatabaseIdFromUrl(url: string): string {
  const match = url.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

// Usar diretamente o ID do banco de dados da URL da página
export const NOTION_DATABASE_ID = process.env.NOTION_PAGE_URL ? 
  extractDatabaseIdFromUrl(process.env.NOTION_PAGE_URL) : 
  (process.env.NOTION_DATABASE_ID || '');

// Initialize Notion client
export const notion = new Client({
  auth: NOTION_TOKEN,
});

// Extract the page ID from the Notion page URL
function extractPageIdFromUrl(pageUrl: string): string {
  const match = pageUrl.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }

  throw Error("Failed to extract page ID");
}

/**
 * Fetch all published posts from the Notion database
 */
export async function getPosts() {
  try {
    console.log("Using database ID:", NOTION_DATABASE_ID);
    
    // Tentativa de buscar do Notion
    try {
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        // Usar a ordenação pelo timestamp padrão do Notion
        sorts: [
          {
            timestamp: "created_time",
            direction: "descending",
          },
        ],
      });

      return response.results.map((page: any) => {
        // Extract post data from the Notion page
        const { properties } = page;
        
        // Get title - usando a propriedade "Nome" que existe no banco de dados
        const title = properties.Nome?.title?.[0]?.plain_text || 
                      properties.Title?.title?.[0]?.plain_text || 
                      "Untitled";
        
        // Get slug - usando o nome correto da propriedade
        const slug = properties.slug?.rich_text?.[0]?.plain_text || 
                     properties.Slug?.rich_text?.[0]?.plain_text || 
                     page.id;
        
        // Get cover image URL
        const coverURL = properties.Cover?.url || 
                         properties.Cover?.files?.[0]?.file?.url ||
                         properties.Cover?.files?.[0]?.external?.url ||
                         (page as any).cover?.external?.url ||
                         (page as any).cover?.file?.url ||
                         null;
        
        // Get tags - usando o nome correto da propriedade
        const tags = properties.tags?.multi_select?.map((tag: any) => tag.name) || 
                     properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
        
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
          createdAt: (page as any).created_time || new Date().toISOString(),
          updatedAt: (page as any).last_edited_time || new Date().toISOString(),
        };
      });
    } catch (error) {
      console.log("Fallback para dados estáticos enquanto a integração não é configurada");
      
      // Dados estáticos para o blog (temporários até a integração funcionar)
      return [
        {
          id: "post-1",
          title: "A Revolução da Inteligência Artificial na Geração de Conteúdo",
          slug: "revolucao-ia-geracao-conteudo",
          cover: null,
          published: true,
          tags: ["IA", "Tecnologia", "Conteúdo"],
          excerpt: "Como as novas tecnologias de IA estão transformando a forma como criamos e consumimos conteúdo digital.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "post-2",
          title: "Estratégias Eficientes para Geração de Conteúdo em 2025",
          slug: "estrategias-geracao-conteudo-2025",
          cover: null,
          published: true,
          tags: ["Conteúdo", "Novidades"],
          excerpt: "Descubra as melhores práticas e ferramentas para otimizar seu processo de criação de conteúdo.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "post-3",
          title: "Como Utilizar Sistemas Vivos para Melhorar seu Conteúdo",
          slug: "sistemas-vivos-melhoria-conteudo",
          cover: null,
          published: true,
          tags: ["Conteúdo", "Tecnologia"],
          excerpt: "Aprenda a integrar conceitos de sistemas vivos para criar conteúdo mais orgânico e envolvente.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

/**
 * Fetch a single post by slug from the Notion database
 */
export async function getPostBySlug(slug: string) {
  try {
    // Tentativa de buscar do Notion
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
        // Fallback para dados estáticos se não encontrou no Notion
        return getStaticPostBySlug(slug);
      }

      const page = response.results[0];
      const { properties } = page as any;
      
      // Get title - usando a propriedade "Nome" que existe no banco de dados
      const title = properties.Nome?.title?.[0]?.plain_text || 
                    properties.Title?.title?.[0]?.plain_text || 
                    "Untitled";
      
      // Get cover image URL
      const coverURL = properties.Cover?.url || 
                       properties.Cover?.files?.[0]?.file?.url ||
                       properties.Cover?.files?.[0]?.external?.url ||
                       (page as any).cover?.external?.url ||
                       (page as any).cover?.file?.url ||
                       null;
      
      // Get tags - usando o nome correto da propriedade
      const tags = properties.tags?.multi_select?.map((tag: any) => tag.name) || 
                   properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
      
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
        createdAt: (page as any).created_time || new Date().toISOString(),
        updatedAt: (page as any).last_edited_time || new Date().toISOString(),
      };
    } catch (error) {
      console.log("Fallback para dados estáticos enquanto a integração não é configurada");
      return getStaticPostBySlug(slug);
    }
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    throw new Error("Failed to fetch post by slug");
  }
}

/**
 * Função auxiliar para fornecer dados estáticos para um post baseado no slug
 */
function getStaticPostBySlug(slug: string) {
  // Dados estáticos para o blog (temporários até a integração funcionar)
  const staticPosts = {
    "revolucao-ia-geracao-conteudo": {
      id: "post-1",
      title: "A Revolução da Inteligência Artificial na Geração de Conteúdo",
      slug: "revolucao-ia-geracao-conteudo",
      cover: null,
      published: true,
      tags: ["IA", "Tecnologia", "Conteúdo"],
      excerpt: "Como as novas tecnologias de IA estão transformando a forma como criamos e consumimos conteúdo digital.",
      content: `
# A Revolução da Inteligência Artificial na Geração de Conteúdo

A inteligência artificial está revolucionando a forma como criamos conteúdo digital. Com modelos de linguagem cada vez mais avançados, as possibilidades são praticamente infinitas.

## Como a IA está mudando o cenário

As ferramentas de IA generativa permitem que criadores de conteúdo:

- Gerem textos de alta qualidade em segundos
- Adaptem o tom de voz para diferentes públicos
- Superem bloqueios criativos com sugestões inteligentes
- Otimizem conteúdo para SEO automaticamente

## O futuro da criação de conteúdo

À medida que a tecnologia avança, veremos uma integração ainda maior entre humanos e IA. O conteúdo do futuro será uma colaboração harmoniosa, onde as máquinas amplificam a criatividade humana em vez de substituí-la.

> "A IA não veio para substituir os criadores de conteúdo, mas para dar-lhes superpoderes." - Especialista em IA

### Próximos passos para criadores de conteúdo

1. Familiarize-se com as ferramentas de IA disponíveis
2. Aprenda a formular prompts eficientes
3. Desenvolva um fluxo de trabalho que integre IA e toque humano
4. Mantenha-se atualizado sobre novas tecnologias e recursos

A geração de conteúdo assistida por IA é apenas o começo. Estamos na aurora de uma nova era de criatividade ampliada por tecnologia.
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    "estrategias-geracao-conteudo-2025": {
      id: "post-2",
      title: "Estratégias Eficientes para Geração de Conteúdo em 2025",
      slug: "estrategias-geracao-conteudo-2025",
      cover: null,
      published: true,
      tags: ["Conteúdo", "Novidades"],
      excerpt: "Descubra as melhores práticas e ferramentas para otimizar seu processo de criação de conteúdo.",
      content: `
# Estratégias Eficientes para Geração de Conteúdo em 2025

O cenário da criação de conteúdo mudou drasticamente nos últimos anos. Com o avanço das ferramentas de IA e análise de dados, 2025 trouxe novas estratégias que todo criador de conteúdo precisa conhecer.

## Tendências dominantes

### 1. Conteúdo personalizado em escala

A personalização já não é mais um diferencial, mas uma necessidade. As ferramentas atuais permitem:

- Segmentação ultra-específica de audiências
- Customização de conteúdo em tempo real
- Adaptação automática de tom, estilo e formato

### 2. Conteúdo multidimensional

O conteúdo que engaja em 2025 não se limita a um único formato:

- Textos que se transformam em áudio sob demanda
- Vídeos que geram transcrições interativas
- Infográficos que se expandem em artigos detalhados

### 3. Otimização contínua baseada em dados

A criação de conteúdo se tornou um processo circular:

1. Criação inicial informada por dados
2. Publicação e monitoramento
3. Ajustes em tempo real baseados em performance
4. Re-otimização constante

## Ferramentas essenciais para 2025

- **Assistentes de IA colaborativos**: ferramentas que não apenas geram, mas colaboram no processo criativo
- **Plataformas de análise preditiva**: identificam tendências antes que se tornem mainstream
- **Suítes de criação omnichannel**: permitem adaptação instantânea para diferentes canais

As estratégias de geração de conteúdo evoluíram para além da simples produção. Hoje, trata-se de criar ecossistemas de conteúdo que crescem, se adaptam e evoluem junto com sua audiência.
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    "sistemas-vivos-melhoria-conteudo": {
      id: "post-3",
      title: "Como Utilizar Sistemas Vivos para Melhorar seu Conteúdo",
      slug: "sistemas-vivos-melhoria-conteudo",
      cover: null,
      published: true,
      tags: ["Conteúdo", "Tecnologia"],
      excerpt: "Aprenda a integrar conceitos de sistemas vivos para criar conteúdo mais orgânico e envolvente.",
      content: `
# Como Utilizar Sistemas Vivos para Melhorar seu Conteúdo

Os sistemas vivos representam uma abordagem revolucionária para pensar sobre criação de conteúdo. Inspirados em princípios biológicos, estes sistemas introduzem elementos de adaptabilidade, crescimento orgânico e interconexão que podem transformar sua estratégia de conteúdo.

## O que são Sistemas Vivos no contexto de conteúdo?

Sistemas vivos de conteúdo são ecossistemas interconectados onde cada peça de conteúdo:

- Evolui com base em interações do usuário
- Se conecta organicamente com outras peças de conteúdo
- Se adapta ao contexto e necessidades do momento
- Cresce e se desenvolve ao longo do tempo

## Princípios fundamentais para implementação

### Interconexão significativa

Diferente de simplesmente linkar conteúdos, a interconexão em sistemas vivos cria relações significativas:

- Mapeamento de jornadas não-lineares de conteúdo
- Recomendações contextuais baseadas em comportamento
- Construção de narrativas adaptativas

### Feedback loops contínuos

O conteúdo em sistemas vivos nunca está verdadeiramente "pronto":

1. Publicação inicial como "versão beta"
2. Coleta de dados sobre engajamento e compreensão
3. Adaptação e evolução do conteúdo
4. Atualização contínua baseada em novas interações

### Abordagem holística

Cada conteúdo é parte de um todo maior:

- Considere como cada peça afeta e é afetada pelo ecossistema completo
- Balance autonomia (conteúdo independente) e integração (conexão com o todo)
- Cultive diversidade de formatos, vozes e perspectivas

## Como começar com Sistemas Vivos de Conteúdo

1. **Auditoria de ecossistema**: Mapeie seu conteúdo existente e identifique conexões naturais
2. **Experimentos controlados**: Comece aplicando princípios em uma seção limitada
3. **Infraestrutura adaptativa**: Invista em ferramentas que permitam evolução contínua
4. **Mentalidade de jardineiro**: Cultive seu conteúdo em vez de simplesmente produzi-lo

Os sistemas vivos não são apenas uma abordagem tecnológica, mas uma nova filosofia que reconhece o conteúdo como algo orgânico, em constante evolução, refletindo a própria natureza da informação no mundo digital.
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
  
  // Retorna o post correspondente ou null se não existir
  return staticPosts[slug as keyof typeof staticPosts] || null;
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
