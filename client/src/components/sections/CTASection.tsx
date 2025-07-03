import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-primary/5 via-white to-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-neutral-900 mb-6"
          >
            Pronto para criar um ecossistema digital de verdade?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-neutral-700 mb-10 font-serif"
          >
            Sem promessas vazias. Com inteligência real e resultados mensuráveis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ12tsOO0WYlIgcGyAuJB88cZAEwUROR5XPcx0_QMI5EKNGTfxSILp-uI49NKzNjWZjYfc4Vwglg?gv=true"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-2xl text-white bg-primary shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all group"
              aria-label="Agende uma conversa"
            >
              Agende uma conversa
              <motion.span
                className="ml-2"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-8 py-4 border border-primary/20 text-base font-semibold rounded-2xl text-neutral-900 bg-white shadow hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              aria-label="Veja exemplos reais"
            >
              Veja exemplos reais
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
