import { Client } from "@notionhq/client";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Credenciais Notion 
const NOTION_TOKEN = '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';

// Initialize Notion client
const notion = new Client({
  auth: NOTION_TOKEN,
});

// Esta função extrai o ID da página a partir de uma URL do Notion
function extractPageIdFromUrl(pageUrl: string): string {
  const match = pageUrl.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }
  throw Error("ID da página não encontrado na URL");
}

// URL da página onde desejamos criar o banco de dados
const NOTION_PAGE_URL = "https://www.notion.so/Blog-1f19641028db80b88ea7000c999b1750";

async function setupNotionDatabase() {
  try {
    console.log("Iniciando configuração do banco de dados no Notion...");
    
    // Extrair o ID da página da URL
    const pageId = extractPageIdFromUrl(NOTION_PAGE_URL);
    console.log(`ID da página: ${pageId}`);
    
    // Criar banco de dados na página
    const databaseResponse = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: pageId,
      },
      title: [
        {
          type: "text",
          text: {
            content: "Blog Posts",
          },
        },
      ],
      properties: {
        Title: {
          title: {}
        },
        Slug: {
          rich_text: {}
        },
        Cover: {
          files: {}
        },
        Published: {
          checkbox: {}
        },
        Tags: {
          multi_select: {
            options: [
              { name: "Tecnologia", color: "blue" },
              { name: "IA", color: "red" },
              { name: "Conteúdo", color: "green" },
              { name: "Novidades", color: "yellow" }
            ]
          }
        },
        Excerpt: {
          rich_text: {}
        }
      },
    });
    
    console.log("Banco de dados criado com sucesso!");
    console.log(`ID do banco de dados: ${databaseResponse.id}`);
    
    // Adicionar posts de exemplo ao banco de dados
    await addSamplePosts(databaseResponse.id);
    
    console.log("Configuração concluída com sucesso!");
    
    // Atualizar o arquivo .env com o ID do banco de dados
    console.log("\nAtualize seu arquivo .env com o seguinte ID de banco de dados:");
    console.log(`NOTION_DATABASE_ID=${databaseResponse.id}`);
    
  } catch (error) {
    console.error("Erro durante a configuração:", error);
  }
}

async function addSamplePosts(databaseId: string) {
  console.log("Adicionando posts de exemplo...");
  
  const posts = [
    {
      title: "A Revolução da Inteligência Artificial na Geração de Conteúdo",
      slug: "revolucao-ia-geracao-conteudo",
      excerpt: "Como as novas tecnologias de IA estão transformando a forma como criamos e consumimos conteúdo digital.",
      tags: ["IA", "Tecnologia", "Conteúdo"],
      content: "A inteligência artificial está revolucionando a forma como criamos conteúdo...",
      published: true
    },
    {
      title: "Estratégias Eficientes para Geração de Conteúdo em 2025",
      slug: "estrategias-geracao-conteudo-2025",
      excerpt: "Descubra as melhores práticas e ferramentas para otimizar seu processo de criação de conteúdo.",
      tags: ["Conteúdo", "Novidades"],
      content: "Com o avanço das tecnologias, novas estratégias de geração de conteúdo...",
      published: true
    },
    {
      title: "Como Utilizar Sistemas Vivos para Melhorar seu Conteúdo",
      slug: "sistemas-vivos-melhoria-conteudo",
      excerpt: "Aprenda a integrar conceitos de sistemas vivos para criar conteúdo mais orgânico e envolvente.",
      tags: ["Conteúdo", "Tecnologia"],
      content: "Os sistemas vivos representam uma nova abordagem para pensar sobre criação de conteúdo...",
      published: true
    }
  ];
  
  for (const post of posts) {
    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: post.title,
              },
            },
          ],
        },
        Slug: {
          rich_text: [
            {
              text: {
                content: post.slug,
              },
            },
          ],
        },
        Published: {
          checkbox: post.published,
        },
        Tags: {
          multi_select: post.tags.map(tag => ({ name: tag })),
        },
        Excerpt: {
          rich_text: [
            {
              text: {
                content: post.excerpt,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: post.content,
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_2",
          heading_2: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Um subtítulo interessante",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                },
              },
            ],
          },
        },
      ],
    });
    
    console.log(`Post criado: ${post.title}`);
  }
  
  console.log("Posts de exemplo adicionados com sucesso!");
}

// Executar o script de configuração
setupNotionDatabase();