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
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  // API route to get a single post by slug
  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error(`Error fetching post with slug ${req.params.slug}:`, error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
