import React from "react";
import { motion } from "framer-motion";
import { Globe, Twitter, Linkedin, BookOpen } from "lucide-react";

const platforms = [
  {
    icon: <BookOpen size={36} className="text-primary" aria-hidden="true" />,
    title: "Blog no Hashnode",
    text: "Publicamos ideias, frameworks e provocações sobre o futuro do marketing B2B.",
    button: "Acessar Blog",
    href: "https://geracaodeconteudo.hashnode.dev/",
  },
  {
    icon: <Twitter size={36} className="text-primary" aria-hidden="true" />,
    title: "X (antigo Twitter)",
    text: "Insights em 280 caracteres. Atualizações rápidas sobre o que estamos construindo.",
    button: "Ver no X",
    href: "https://x.com/gdeconteudo",
  },
  {
    icon: <Linkedin size={36} className="text-primary" aria-hidden="true" />,
    title: "LinkedIn",
    text: "Reflexões profundas, bastidores e posicionamentos estratégicos sobre IA, inovação e marketing para negócios.",
    button: "Ver no LinkedIn",
    href: "https://www.linkedin.com/in/marcelambiente/",
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

const SocialLinksSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 via-white to-neutral-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold mb-6"
          >
            🌐 Estamos em outras plataformas
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group bg-white/80 border border-primary/10 rounded-2xl overflow-hidden shadow transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/5 focus-within:scale-105 focus-within:shadow-xl cursor-pointer p-8 flex flex-col items-center text-center"
              tabIndex={0}
              aria-label={platform.title}
            >
              <div className="h-20 w-20 flex items-center justify-center mb-6 rounded-xl bg-primary/10">
                {platform.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{platform.title}</h3>
              <p className="text-neutral-600 font-serif mb-4 text-center">{platform.text}</p>
              <motion.a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center text-primary font-semibold px-5 py-2 rounded-xl border border-primary/20 bg-white hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                aria-label={platform.button}
              >
                {platform.button}
                <Globe className="ml-2 w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;