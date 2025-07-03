import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
  { href: '/#why', label: 'Por que' },
  { href: '/#ai', label: 'IA com bom gosto' },
  { href: '/#products', label: 'Soluções' },
  { href: 'https://blog.geracaodeconteudo.com.br', label: 'Blog', external: true },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-white/90 via-primary/10 to-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm' : 'bg-transparent'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 focus:outline-none">
              <Logo />
            </Link>
            <div className="hidden md:block ml-6">
              <nav aria-label="Navegação principal">
                <ul className="flex items-center space-x-8">
                  {navLinks.map(link => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-neutral-700 hover:text-primary px-2 py-1 text-sm font-medium transition-colors focus:outline-none focus:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="hidden md:block">
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-semibold rounded-2xl text-white bg-primary shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              aria-label="Agende uma conversa"
            >
              Agende uma conversa
            </motion.a>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white/80 p-2 rounded-md text-neutral-700 hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <span className="sr-only">Abrir menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 shadow-lg border-b border-neutral-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-primary/10 hover:text-primary focus:outline-none focus:bg-primary/10 focus:text-primary transition-all"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90 focus:outline-none focus:bg-primary/90 mt-2 transition-all"
                aria-label="Agende uma conversa"
              >
                Agende uma conversa
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;