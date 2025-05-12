import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ManifestoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        delay: custom * 0.2
      }
    })
  };

  return (
    <section className="py-24 bg-neutral-900 text-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Manifesto</h2>
          </motion.div>
          
          <div className="prose prose-lg prose-invert mx-auto">
            <motion.p 
              className="text-xl md:text-2xl font-serif leading-relaxed mb-6"
              variants={textVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Não vendemos templates. Vendemos arquitetura.
            </motion.p>
            <motion.p 
              className="text-xl md:text-2xl font-serif leading-relaxed mb-6"
              variants={textVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Não criamos automações genéricas, mas sistemas vivos.
            </motion.p>
            <motion.p 
              className="text-xl md:text-2xl font-serif leading-relaxed mb-6"
              variants={textVariants}
              custom={3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Preferimos bots que escutam a funis que gritam.
            </motion.p>
            <motion.p 
              className="text-xl md:text-2xl font-serif italic mb-12"
              variants={textVariants}
              custom={4}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Eu sou Marcel.
            </motion.p>
            <motion.p 
              className="text-lg font-serif"
              variants={textVariants}
              custom={5}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              E vou pensar, revisar, ajustar e entregar seu projeto com a mesma atenção que daria ao meu.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
