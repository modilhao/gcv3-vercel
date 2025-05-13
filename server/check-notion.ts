import { Client } from "@notionhq/client";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// Extrair o ID do banco de dados da URL da página
function extractDatabaseIdFromUrl(url: string): string {
  const match = url.match(/([a-f0-9]{32})(?:[?#]|$)/i);
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

async function checkNotionDatabase() {
  const NOTION_TOKEN = process.env.NOTION_TOKEN || '';
  
  if (!NOTION_TOKEN) {
    console.error("Token do Notion não encontrado!");
    return;
  }
  
  // Initialize Notion client
  const notion = new Client({
    auth: NOTION_TOKEN,
  });

  const databaseId = process.env.NOTION_PAGE_URL ? 
    extractDatabaseIdFromUrl(process.env.NOTION_PAGE_URL) : 
    (process.env.NOTION_DATABASE_ID || '');
  
  if (!databaseId) {
    console.error("ID do banco de dados não encontrado!");
    return;
  }
  
  console.log("Verificando acesso ao banco de dados do Notion...");
  console.log(`Database ID: ${databaseId}`);
  
  try {
    // Tentar obter informações sobre o banco de dados
    const response = await notion.databases.retrieve({
      database_id: databaseId
    });
    
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
    console.log("\nInformações do banco de dados:");
    console.log(`Título: ${response.title?.[0]?.plain_text || "Sem título"}`);
    
    // Listar propriedades do banco de dados
    console.log("\nPropriedades encontradas:");
    const properties = response.properties;
    for (const [name, prop] of Object.entries(properties)) {
      console.log(`- ${name} (${prop.type})`);
    }
    
    // Verificar se o banco de dados tem as propriedades necessárias
    const requiredProperties = ["Title", "Slug", "Cover", "Published", "Tags", "Excerpt"];
    const missingProperties = requiredProperties.filter(prop => 
      !Object.keys(properties).includes(prop) && 
      !Object.keys(properties).includes(prop.toLowerCase())
    );
    
    if (missingProperties.length > 0) {
      console.log("\n⚠️ Propriedades faltando no banco de dados:");
      missingProperties.forEach(prop => console.log(`- ${prop}`));
      console.log("\nVocê precisa adicionar essas propriedades ao seu banco de dados para que ele funcione corretamente.");
    } else {
      console.log("\n✅ O banco de dados tem todas as propriedades necessárias!");
    }
    
    // Exibir a quantidade de registros
    try {
      const postsResponse = await notion.databases.query({
        database_id: databaseId,
      });
      
      console.log(`\nRegistros encontrados: ${postsResponse.results.length}`);
      
      // Mostrar primeiros 3 posts
      if (postsResponse.results.length > 0) {
        console.log("\nPrimeiros posts encontrados:");
        for (let i = 0; i < Math.min(3, postsResponse.results.length); i++) {
          const page = postsResponse.results[i] as any;
          const title = page.properties.Title?.title?.[0]?.plain_text || "Sem título";
          console.log(`- ${title}`);
        }
      }
    } catch (error) {
      console.log("\n❌ Não foi possível listar os registros do banco de dados.");
      console.error(error);
    }
    
  } catch (error) {
    console.log("❌ Erro ao acessar o banco de dados do Notion:");
    console.error(error);
    
    console.log("\nVerifique os seguintes pontos:");
    console.log("1. O token do Notion é válido");
    console.log("2. A URL da página fornecida é realmente de um banco de dados");
    console.log("3. O banco de dados foi compartilhado com sua integração");
    console.log("   (Na página do banco de dados, clique em '...' > 'Add connections' e selecione sua integração)");
  }
}

// Executar a verificação
checkNotionDatabase();