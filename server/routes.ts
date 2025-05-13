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
    try {
      const { slugOrId } = req.params;
      
      // Primeiro, tenta buscar por ID caso o parâmetro seja um ID do Notion
      if (slugOrId.includes('-') && slugOrId.length > 32) {
        // Busca todos os posts
        const allPosts = await getPosts();
        // Encontra o post com o ID correspondente
        const postById = allPosts.find(post => post.id === slugOrId);
        
        if (postById) {
          // Se encontrou pelo ID, busca os detalhes completos
          const fullPost = await getPostBySlug(postById.slug || slugOrId);
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
          slug: req.params.slug,
          content: "O artigo que você está procurando não está disponível no momento.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      res.json(post);
    } catch (error) {
      console.error(`Error fetching post with slug ${req.params.slug}:`, error);
      const slugParam = req.params.slug;
      res.status(404).json({ 
        message: "Post not found",
        id: "error",
        title: "Artigo não encontrado",
        slug: slugParam,
        content: "O artigo que você está procurando não está disponível no momento.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}