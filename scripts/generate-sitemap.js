import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para obter a data atual formatada para XML
function getFormattedDate() {
  return new Date().toISOString();
}

// URLs estáticas do site
const BASE_URL = 'https://geracaodeconteudo.com.br';
const STATIC_PAGES = [
  { url: '/', priority: '1.0' },
  { url: '/blog', priority: '0.8' },
];

// Função para buscar dados de posts do blog para adicionar ao sitemap
async function fetchBlogPosts() {
  try {
    // Importar a função de API do Notion para buscar posts
    const { notion, NOTION_DATABASE_ID } = await import('../server/notion.js');
    
    if (!notion || !NOTION_DATABASE_ID) {
      console.warn('Configuração do Notion ausente, usando dados de exemplo');
      // Dados de fallback caso a configuração do Notion não esteja disponível
      return [
        { slug: 'revolucao-ia-geracao-conteudo', lastModified: getFormattedDate() },
        { slug: 'estrategias-geracao-conteudo-2025', lastModified: getFormattedDate() },
      ];
    }
    
    // Consultar posts do Notion
    console.log('Buscando posts do Notion...');
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: 'CreatedAt',
          direction: 'descending'
        }
      ]
    });
    
    // Mapear resultados para o formato esperado
    const posts = response.results.map(page => {
      const slug = page.properties.Slug?.rich_text[0]?.plain_text || '';
      const createdTime = page.created_time;
      const lastEditedTime = page.last_edited_time;
      
      return {
        slug: slug,
        lastModified: lastEditedTime || createdTime || getFormattedDate()
      };
    });
    
    console.log(`Encontrados ${posts.length} posts publicados`);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error);
    console.error('Detalhes:', error.stack);
    
    // Retornar dados de exemplo em caso de erro
    return [
      { slug: 'revolucao-ia-geracao-conteudo', lastModified: getFormattedDate() },
      { slug: 'estrategias-geracao-conteudo-2025', lastModified: getFormattedDate() },
    ];
  }
}

// Função principal para gerar o sitemap
async function generateSitemap() {
  try {
    // Buscar posts do blog
    const blogPosts = await fetchBlogPosts();
    
    // Início do documento XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Adicionar páginas estáticas
    STATIC_PAGES.forEach(page => {
      sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${getFormattedDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Adicionar páginas de blog
    blogPosts.forEach(post => {
      sitemap += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });

    // Finalizar o documento XML
    sitemap += `</urlset>`;

    // Escrever o arquivo de sitemap
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);

    console.log(`Sitemap gerado com sucesso em ${sitemapPath}`);
    console.log(`Total de páginas no sitemap: ${STATIC_PAGES.length + blogPosts.length}`);
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
  }
}

// Executar a geração do sitemap
generateSitemap();