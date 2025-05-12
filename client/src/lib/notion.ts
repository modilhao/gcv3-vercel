import { apiRequest } from "./queryClient";

export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  cover?: string;
  published: boolean;
  tags: string[];
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotionPostDetail extends NotionPost {
  content: string;
}

export async function getPosts(): Promise<NotionPost[]> {
  const response = await apiRequest("GET", "/api/posts", undefined);
  const posts = await response.json();
  return posts;
}

export async function getPost(slug: string): Promise<NotionPostDetail> {
  const response = await apiRequest("GET", `/api/posts/${slug}`, undefined);
  const post = await response.json();
  return post;
}
