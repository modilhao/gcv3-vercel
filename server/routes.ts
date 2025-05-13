import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getPosts, getPostBySlug } from "./notion";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await getPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Retorna uma lista vazia em vez de erro
      res.json([]);
    }
  });

  // API route to get a single post by slug ou id
  app.get("/api/posts/:slugOrId", async (req, res) => {
    // Extraindo o slugOrId dos parâmetros de requisição
    const { slugOrId } = req.params;
    
    try {
      
      // Primeiro, tenta buscar por ID caso o parâmetro seja um ID do Notion
      if (slugOrId.includes('-') && slugOrId.length > 32) {
        // Busca todos os posts
        const allPosts = await getPosts();
        // Encontra o post com o ID correspondente
        const postById = allPosts.find(post => post.id === slugOrId);
        
        if (postById && postById.slug) {
          // Se encontrou pelo ID e tem slug, busca os detalhes completos
          const fullPost = await getPostBySlug(postById.slug);
          if (fullPost) {
            return res.json(fullPost);
          }
        }
      }
      
      // Se não encontrou por ID ou não é um ID, tenta buscar por slug
      const post = await getPostBySlug(slugOrId);
      
      if (!post) {
        return res.status(404).json({ 
          message: "Post not found",
          id: "not-found",
          title: "Artigo não encontrado",
          slug: slugOrId,
          content: "O artigo que você está procurando não está disponível no momento.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      res.json(post);
    } catch (error) {
      console.error(`Error fetching post with slug/id ${slugOrId}:`, error);
      res.status(404).json({ 
        message: "Post not found",
        id: "error",
        title: "Artigo não encontrado",
        slug: slugOrId,
        content: "O artigo que você está procurando não está disponível no momento.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}