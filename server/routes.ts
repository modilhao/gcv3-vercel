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

  // API route to get a single post by slug
  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ 
          message: "Post not found",
          id: "not-found",
          title: "Artigo não encontrado",
          slug: slug,
          content: "O artigo que você está procurando não está disponível no momento.",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      res.json(post);
    } catch (error) {
      console.error(`Error fetching post with slug ${req.params.slug}:`, error);
      res.status(404).json({ 
        message: "Post not found",
        id: "error",
        title: "Artigo não encontrado",
        slug: slug,
        content: "O artigo que você está procurando não está disponível no momento.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
