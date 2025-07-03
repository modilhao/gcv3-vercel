import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/#why", label: "Por que" },
  { href: "/#ai", label: "IA com bom gosto" },
  { href: "/#products", label: "Soluções" },
  { href: "https://blog.geracaodeconteudo.com.br", label: "Blog", external: true },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className={`fixed w-full z-50 border-b transition-all duration-300 ${isScrolled ? "shadow-sm bg-white/90 backdrop-blur-md border-neutral-200" : "bg-gradient-to-b from-white/90 via-white/80 to-transparent border-transparent"}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" aria-label="Ir para a página inicial">
              <Logo />
            </Link>
            <nav className="hidden md:block ml-6" aria-label="Menu principal">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 hover:text-primary px-2 py-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-neutral-600 hover:text-primary px-2 py-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </nav>
          </div>
          <div className="hidden md:block">
            <a
              href="/#contact"
              className="inline-flex items-center px-5 py-2 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200"
              aria-label="Agende uma conversa"
            >
              Agende uma conversa
            </a>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white/80 p-2 rounded-md text-neutral-600 hover:text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              id="mobile-menu-button"
              aria-label="Abrir menu"
            >
              <span className="sr-only">Abrir menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-white/95 shadow-lg border-b border-primary/10"
            id="mobile-menu"
            aria-labelledby="mobile-menu-button"
            role="navigation"
          >
            <div className="px-4 pt-4 pb-4 space-y-2">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 rounded-xl text-base font-medium text-primary border border-primary/20 bg-white hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                    aria-label={link.label}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block w-full px-4 py-3 rounded-xl text-base font-medium text-primary border border-primary/20 bg-white hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                    aria-label={link.label}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="/#contact"
                className="block w-full px-4 py-3 rounded-xl text-base font-semibold text-white bg-primary hover:bg-primary/90 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                aria-label="Agende uma conversa"
                onClick={() => setIsMenuOpen(false)}
              >
                Agende uma conversa
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
