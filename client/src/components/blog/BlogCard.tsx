import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Post } from '@/lib/notion';

interface BlogCardProps {
  post: Post;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.div 
      className="blog-preview bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.5, delay: index * 0.1 } 
        }
      }}
    >
      {post.cover && (
        <img 
          src={post.cover} 
          alt={`Imagem ilustrativa para ${post.title}`} 
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-6">
        {post.tags && post.tags.length > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {post.tags[0]}
          </span>
        )}
        <h3 className="mt-4 text-lg font-medium text-neutral-900">
          {post.title}
        </h3>
        <p className="mt-2 text-sm font-serif text-neutral-600 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-6">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-primary hover:text-primary/80 font-medium text-sm">
              Ler artigo
              <span aria-hidden="true"> →</span>
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
