import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Abstract digital ecosystem background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-bl from-primary-50/50 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary-100/30 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
            Sistemas vivos para o seu crescimento
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-600 leading-relaxed font-serif">
            Arquitetamos ecossistemas digitais que escutam, aprendem e convertem — enquanto você dorme.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a 
              href="#contact" 
              className="px-6 py-3 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agende uma conversa
            </motion.a>
            <motion.a 
              href="#products" 
              className="px-6 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg shadow-sm hover:bg-neutral-50 transition-all duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver soluções
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
