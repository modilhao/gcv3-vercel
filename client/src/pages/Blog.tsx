import React, { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Blog: React.FC = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["/api/posts"],
    queryFn: getPosts,
  });

  // Update meta tags for SEO
  useEffect(() => {
    document.title = "Blog | Geração de Conteúdo";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Artigos e insights sobre ecossistemas digitais, inteligência artificial e arquitetura digital.');
    
    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Blog | Geração de Conteúdo' },
      { property: 'og:description', content: 'Artigos e insights sobre ecossistemas digitais, inteligência artificial e arquitetura digital.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
    ];
    
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold text-neutral-900 mb-6">Blog</h1>
            <p className="text-xl text-neutral-600 font-serif">
              Insights e reflexões sobre ecossistemas digitais, IA e arquitetura digital.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-20 mb-4" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-6" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-500">Erro ao carregar os posts. Tente novamente mais tarde.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="blog-preview bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                    {post.cover && (
                      <img src={post.cover} alt={post.title} className="h-48 w-full object-cover" />
                    )}
                    <div className="p-6">
                      {post.tags && post.tags.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {post.tags[0]}
                        </span>
                      )}
                      <h3 className="mt-4 text-lg font-medium text-neutral-900">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm font-serif text-neutral-600 line-clamp-3">
                        {post.excerpt || "Confira este artigo em nosso blog."}
                      </p>
                      <div className="mt-6">
                        <Link href={`/blog/${post.slug}`} className="text-primary hover:text-primary/80 font-medium text-sm">
                          Ler artigo
                          <span aria-hidden="true"> →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-3 text-center p-8">
                  <p>Nenhum artigo publicado ainda. Volte em breve!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
