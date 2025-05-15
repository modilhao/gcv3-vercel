import React, { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumb";

// Import a markdown renderer
// We'll use react-markdown for rendering markdown content
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/posts/${slug}`],
    queryFn: () => getPost(slug || ""),
    enabled: !!slug,
  });

  // Função para renderizar o componente SEO
  const renderSEO = () => {
    if (!post) return null;
    
    // Processar a imagem de capa
    let coverUrl = 'https://geracaodeconteudo.com.br/assets/og-image.jpg';
    if (post.cover) {
      coverUrl = post.cover.replace(/https:\/\/gcv3\.replit\.app/g, 'https://geracaodeconteudo.com.br');
    }
    
    return (
      <SEO 
        title={`${post.title} | Geração de Conteúdo V3`}
        description={post.excerpt || `Leia mais sobre ${post.title} em nosso blog.`}
        url={`https://geracaodeconteudo.com.br/blog/${slug}`}
        image={coverUrl}
        type="article"
        articleJsonLd={true}
        publishedTime={post.createdAt}
        modifiedTime={post.updatedAt}
        tags={post.tags}
      />
    );
  };

  return (
    <>
      {post && renderSEO()}
      <Navbar />
      <main className="pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-72 w-full mb-8" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-500">Erro ao carregar o artigo. Tente novamente mais tarde.</p>
              <Link href="/blog" className="inline-flex mt-4 text-primary hover:text-primary/80 font-medium">
                ← Voltar para o blog
              </Link>
            </div>
          ) : post ? (
            <>
              <div className="mb-8">
                <Breadcrumbs 
                  items={[
                    { label: 'Blog', href: '/blog' },
                    { label: post.title }
                  ]}
                  className="mb-4"
                />
              </div>
              
              <h1 className="text-4xl font-bold text-neutral-900 mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags && post.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
                <span className="text-neutral-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              {post.cover && (
                <img 
                  src={post.cover} 
                  alt={post.title} 
                  className="w-full h-auto max-h-96 object-cover rounded-xl mb-8"
                />
              )}
              
              <div className="prose prose-lg max-w-none font-serif">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <p>Post não encontrado</p>
              <Link href="/blog" className="inline-flex mt-4 text-primary hover:text-primary/80 font-medium">
                ← Voltar para o blog
              </Link>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
