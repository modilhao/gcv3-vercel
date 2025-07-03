import React from "react";
import { motion } from "framer-motion";
import neuralNetworkBg from "../../assets/neural-network-bg.webp";
import neuralNetworkBgMobile from "../../assets/optimized/neural-network-bg-mobile.svg";

const manifesto = [
  "Não vendemos templates. Vendemos arquitetura.",
  "Não criamos automações genéricas, mas sistemas vivos.",
  "Preferimos bots que escutam a funis que gritam.",
];

const ManifestoSection: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Gradiente animado sobre o fundo */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ background: "radial-gradient(ellipse at 60% 40%, #fbbf24 0%, transparent 60%)" }}
        transition={{ duration: 2 }}
      />
      {/* Imagem de fundo */}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-75 z-0"></div>
      <picture>
        <source 
          srcSet={neuralNetworkBg} 
          type="image/webp" 
          media="(min-width: 640px)"
        />
        <source 
          srcSet={neuralNetworkBgMobile} 
          type="image/svg+xml" 
          media="(max-width: 639px)"
        />
        <img 
          src={neuralNetworkBg} 
          alt="Fundo de rede neural" 
          className="absolute top-0 left-0 w-full h-full object-cover mix-blend-soft-light z-0"
          width="1920"
          height="1080"
          loading="lazy"
        />
      </picture>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-bold mb-6"
            >
              Manifesto
            </motion.h2>
          </div>
          <div className="flex flex-col gap-6 items-center">
            {manifesto.map((frase, i) => (
              <motion.p
                key={frase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                className="text-xl md:text-2xl font-serif leading-relaxed text-center max-w-2xl"
              >
                {frase}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-xl md:text-2xl font-serif italic mt-10 mb-0 text-center max-w-2xl group"
            >
              <motion.span
                whileHover={{ color: "#fbbf24", textShadow: "0 2px 16px #fbbf24" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block cursor-pointer"
                tabIndex={0}
                aria-label="Assinatura do CEO"
              >
                Me chamo Marcel, sou o CEO da Geração de Conteúdo. Eu irei pensar, revisar, ajustar e entregar seu projeto com a mesma atenção que daria ao meu.
              </motion.span>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;