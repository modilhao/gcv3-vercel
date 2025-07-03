import React from "react";
import { motion } from "framer-motion";
import { Mail, Calendar, Linkedin, Twitter, Send } from "lucide-react";
import Logo from "./Logo";

const footerLinks = [
  { href: "/#why", label: "Por que" },
  { href: "/#ai", label: "IA com bom gosto" },
  { href: "/#products", label: "Soluções" },
  { href: "https://blog.geracaodeconteudo.com.br", label: "Blog", external: true },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/marcelambiente/",
    label: "LinkedIn",
    icon: <Linkedin size={22} />,
  },
  {
    href: "https://twitter.com/gdeconteudo",
    label: "Twitter",
    icon: <Twitter size={22} />,
  },
];

const contactLinks = [
  {
    href: "mailto:hello@geracaodeconteudo.com.br",
    label: "hello@geracaodeconteudo.com.br",
    icon: <Mail size={18} />,
  },
  {
    href: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ12tsOO0WYlIgcGyAuJB88cZAEwUROR5XPcx0_QMI5EKNGTfxSILp-uI49NKzNjWZjYfc4Vwglg?gv=true",
    label: "Agende uma conversa",
    icon: <Calendar size={18} />,
    external: true,
  },
];

const blockVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.7, type: "spring" },
  }),
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 relative overflow-hidden" role="contentinfo">
      {/* Gradiente decorativo atenuado */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(251,191,36,0.18) 0%, transparent 70%)" }}
        transition={{ duration: 2 }}
      />
      {/* Overlay escuro para contraste */}
      <div className="absolute inset-0 z-0 bg-black/60 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo + descrição */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={blockVariants}
            className="md:col-span-2 flex flex-col gap-4"
          >
            <div className="flex items-center mb-2">
              <Logo />
              <span className="ml-2 text-lg font-medium">Geração de Conteúdo</span>
            </div>
            <p className="text-neutral-400 font-serif max-w-md">
              Arquitetamos ecossistemas digitais que escutam, aprendem e convertem — enquanto você dorme.
            </p>
          </motion.div>
          {/* Navegação */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={blockVariants}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Navegação</h3>
            <nav aria-label="Navegação de rodapé">
              <ul className="space-y-2">
                {footerLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-white hover:text-primary transition-colors focus:outline-none focus:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
          {/* Contato */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={blockVariants}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-4">
              {contactLinks.map(link => (
                <li key={link.href} className="flex items-center">
                  <span className="mr-2 text-neutral-400">{link.icon}</span>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-white hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Newsletter (placeholder) */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={blockVariants}
            className="flex flex-col gap-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="rounded-lg px-4 py-2 bg-neutral-800 text-white placeholder:text-neutral-200 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Seu e-mail"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Inscrever-se na newsletter"
              >
                <Send size={16} />
                Inscrever
              </button>
            </form>
            <span className="text-xs text-neutral-500">Receba novidades e conteúdos exclusivos.</span>
          </motion.div>
        </div>
        {/* Redes sociais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex space-x-6 justify-center mb-8"
        >
          {socialLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-neutral-400 hover:text-primary transition-colors focus:outline-none focus:text-primary"
              style={{ color: "#fff" }}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} Geração de Conteúdo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
