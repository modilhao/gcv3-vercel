import React from "react";
import { motion } from "framer-motion";
import { Bot, Calculator, MessageSquare } from "lucide-react";

const products = [
  {
    icon: <Bot size={40} className="text-primary" aria-hidden="true" />,
    title: "Bots nativos",
    text: "Substituem formulários. Entendem o lead, tiram dúvidas, qualificam e agendam — sem depender da sua equipe.",
  },
  {
    icon: <Calculator size={40} className="text-primary" aria-hidden="true" />,
    title: "Webapps úteis",
    text: "Simuladores e calculadoras que geram valor antes da venda — sem precisar falar com um vendedor.",
  },
  {
    icon: <MessageSquare size={40} className="text-primary" aria-hidden="true" />,
    title: "Landing pages conversacionais",
    text: "Criamos fluxos que escutam, adaptam e convertem com o mínimo de atrito.",
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

const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-gradient-to-br from-white via-neutral-50 to-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">O que entregamos na prática</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group bg-white/80 border border-primary/10 rounded-2xl overflow-hidden shadow transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/5 focus-within:scale-105 focus-within:shadow-xl cursor-pointer p-8 flex flex-col items-center text-center"
              tabIndex={0}
              aria-label={product.title}
            >
              <div className="h-20 w-20 flex items-center justify-center mb-6 rounded-xl bg-primary/10">
                {product.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">{product.title}</h3>
              <p className="text-neutral-600 font-serif">{product.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <motion.a
            href="https://escribaai.com.br"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#f7931a] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition text-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="Veja um exemplo"
          >
            Veja um exemplo
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
