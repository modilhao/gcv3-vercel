import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import BlogCard from '../blog/BlogCard';
import { Post } from '@/lib/notion';

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    refetchOnWindowFocus: false
  });

  return (
    <section id="blog" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Blog</h2>
          <p className="text-lg text-neutral-600 font-serif">
            Insights e reflexões sobre sistemas vivos, IA e arquitetura digital.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 bg-neutral-100 animate-pulse" />
                <div className="p-6">
                  <div className="h-4 bg-neutral-100 rounded w-1/3 mb-4 animate-pulse" />
                  <div className="h-6 bg-neutral-100 rounded w-3/4 mb-4 animate-pulse" />
                  <div className="h-4 bg-neutral-100 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-neutral-100 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-neutral-100 rounded w-2/3 mb-4 animate-pulse" />
                  <div className="h-6 bg-neutral-100 rounded w-1/4 mt-6 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-500">Erro ao carregar os posts. Por favor, tente novamente mais tarde.</p>
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {posts && posts.length > 0 ? (
              posts.slice(0, 3).map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-3 text-center p-8 bg-neutral-50 rounded-lg">
                <p className="text-neutral-500">Nenhum post publicado ainda.</p>
              </div>
            )}
          </motion.div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/blog">
            <motion.a 
              className="inline-flex items-center px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg shadow-sm hover:bg-neutral-50 transition-all duration-200 font-medium cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver todos os artigos
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
