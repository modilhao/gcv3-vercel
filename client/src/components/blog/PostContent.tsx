import { Post } from '@/lib/notion';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';

interface PostContentProps {
  slug: string;
}

const PostContent = ({ slug }: PostContentProps) => {
  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: [`/api/posts/${slug}`],
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-64 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 p-4 rounded-md">
          <h1 className="text-lg font-medium text-red-800">Erro ao carregar o post</h1>
          <p className="mt-2 text-sm text-red-700">
            Não foi possível carregar o conteúdo deste post. Por favor, tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{post.title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-neutral-600">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.publishedAt && (
          <time dateTime={new Date(post.publishedAt).toISOString()}>
            {new Date(post.publishedAt).toLocaleDateString('pt-BR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        )}
      </div>
      
      {post.cover && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img 
            src={post.cover} 
            alt={`Imagem destacada para ${post.title}`} 
            className="w-full h-auto object-cover" 
          />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostContent;
