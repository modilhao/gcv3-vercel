import React from "react";
import { motion } from "framer-motion";
import { Building2, MessageCircle, Users, Timer } from "lucide-react";

const items = [
  {
    icon: <Building2 size={28} className="text-primary" aria-hidden="true" />,
    text: "Se você vende para empresas.",
  },
  {
    icon: <MessageCircle size={28} className="text-primary" aria-hidden="true" />,
    text: "Se sua venda depende de conversas.",
  },
  {
    icon: <Users size={28} className="text-primary" aria-hidden="true" />,
    text: "Se seu cliente tem múltiplos decisores e seu ciclo leva semanas ou meses.",
  },
  {
    icon: <Timer size={28} className="text-primary" aria-hidden="true" />,
    text: "Se sua equipe já não pode mais perder tempo com leads frios ou pipelines manuais...",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.12, duration: 0.7, type: "spring" },
  }),
};

const ForWhomSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-neutral-50 to-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold mb-6"
            >
              Para quem é
            </motion.h2>
          </div>
          <div className="grid gap-6 mb-10">
            {items.map((item, i) => (
              <motion.div
                key={item.text}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="flex items-center gap-4 p-5 rounded-xl bg-white/80 border border-primary/10 shadow group hover:scale-105 hover:shadow-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer focus-within:scale-105 focus-within:shadow-lg"
                tabIndex={0}
                aria-label={item.text}
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                  {item.icon}
                </div>
                <span className="text-lg text-neutral-900 font-serif">{item.text}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mb-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-xl font-bold text-black border-b-2 border-primary/60 inline-block px-2 text-center"
            >
              <strong>Então este ecossistema é para você.</strong>
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-lg font-serif text-neutral-700 text-center"
          >
            Atendemos empresas B2B que querem crescer com inteligência, não com suor e sorte.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;