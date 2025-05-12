import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="why" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Por que sistemas vivos?</h2>
          <p className="text-xl text-neutral-600 font-serif leading-relaxed">
            Você não precisa de mais um site.<br />
            Precisa de um sistema vivo — que age, escuta e responde como uma extensão da sua equipe.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="group p-6 rounded-xl bg-neutral-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-12 h-12 mb-5 flex items-center justify-center bg-primary-100 text-primary rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Conexões, não só leads</h3>
            <p className="text-neutral-600 font-serif">Enquanto landing pages convencionais capturam leads, nossos ecossistemas criam conexões.</p>
          </motion.div>
          
          <motion.div 
            className="group p-6 rounded-xl bg-neutral-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-12 h-12 mb-5 flex items-center justify-center bg-primary-100 text-primary rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Conversas, não só respostas</h3>
            <p className="text-neutral-600 font-serif">Enquanto bots comuns respondem, nossos fluxos conversam.</p>
          </motion.div>
          
          <motion.div 
            className="group p-6 rounded-xl bg-neutral-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-12 h-12 mb-5 flex items-center justify-center bg-primary-100 text-primary rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Confiança, não só emails</h3>
            <p className="text-neutral-600 font-serif">Enquanto automações disparam e-mails, nossas estruturas constroem confiança.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
