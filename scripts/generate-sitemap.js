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
];

// Não há mais posts de blog para buscar
async function fetchBlogPosts() {
  return [];
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

    // Não há mais páginas de blog para adicionar

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