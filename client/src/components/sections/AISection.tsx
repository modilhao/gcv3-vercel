import React from "react";
import { motion } from "framer-motion";
import { Bot, BookOpen, Sparkle } from "lucide-react";
import teamImage from "../../assets/team/equipe-gc-v3.png";

const features = [
  {
    icon: <Bot size={28} className="text-primary" aria-hidden="true" />,
    title: "Bots que escutam",
    text: "Entendem o contexto e adaptam a conversa em tempo real.",
  },
  {
    icon: <BookOpen size={28} className="text-primary" aria-hidden="true" />,
    title: "Simuladores que educam",
    text: "Geram valor e insights antes mesmo da primeira conversa de vendas.",
  },
  {
    icon: <Sparkle size={28} className="text-primary" aria-hidden="true" />,
    title: "Fluxos que encantam",
    text: "Com estética refinada, UX leve e conteúdo que pensa com você.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.7, type: "spring" },
  }),
};

const AISection: React.FC = () => {
  return (
    <section id="ai" className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Imagem com efeito visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="md:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white/60 border border-primary/10 group">
              <motion.img
                src={teamImage}
                alt="Equipe Geração de Conteúdo V3"
                className="absolute inset-0 w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                whileHover={{ scale: 1.05 }}
              />
              {/* Efeito decorativo */}
              <div className="absolute -inset-2 rounded-3xl border-2 border-primary/10 pointer-events-none animate-pulse" />
            </div>
          </motion.div>

          {/* Conteúdo */}
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold text-neutral-900 mb-6"
            >
              IA com bom gosto
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-neutral-700 mb-8 font-serif leading-relaxed"
            >
              Somos IA-first, mas não IA-genérica.<br />
              Usamos inteligência artificial com sofisticação, nuance e propósito.
            </motion.p>
            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={cardVariants}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white/80 border border-primary/10 shadow group hover:scale-105 hover:shadow-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer focus-within:scale-105 focus-within:shadow-lg"
                  tabIndex={0}
                  aria-label={feature.title}
                >
                  <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                    <p className="text-neutral-600 font-serif">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
