import React from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: <Users size={32} className="text-primary" aria-hidden="true" />,
    title: "Conexões reais",
    text: "Mais do que capturar leads, criamos ecossistemas digitais que geram conexões autênticas.",
  },
  {
    icon: <MessageCircle size={32} className="text-primary" aria-hidden="true" />,
    title: "Conversas inteligentes",
    text: "Nossos fluxos conversam de verdade, indo além de respostas automáticas.",
  },
  {
    icon: <ShieldCheck size={32} className="text-primary" aria-hidden="true" />,
    title: "Confiança contínua",
    text: "Automação que constrói confiança e relacionamento, não só e-mails.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.7, type: "spring" },
  }),
};

const WhySection: React.FC = () => {
  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Por que sistemas vivos?</h2>
          <p className="text-xl text-neutral-600 font-serif leading-relaxed">
            Você não precisa de mais um site.<br />
            Precisa de um ecossistema digital que age, escuta e responde como uma extensão da sua equipe.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-neutral-100 shadow transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/5 focus-within:scale-105 focus-within:shadow-xl cursor-pointer"
              tabIndex={0}
              aria-label={card.title}
            >
              <div className="w-14 h-14 mb-5 flex items-center justify-center bg-primary/10 rounded-xl">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{card.title}</h3>
              <p className="text-neutral-600 font-serif">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
