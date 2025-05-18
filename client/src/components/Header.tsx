import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import Logo from './Logo';

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
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-sm border-b border-neutral-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="hidden md:block ml-6">
              <div className="flex items-center space-x-8">
                <a href="/#why" className="text-neutral-600 hover:text-neutral-900 px-2 py-1 text-sm font-medium transition-colors">
                  Por que
                </a>
                <a href="/#ai" className="text-neutral-600 hover:text-neutral-900 px-2 py-1 text-sm font-medium transition-colors">
                  IA com bom gosto
                </a>
                <a href="/#products" className="text-neutral-600 hover:text-neutral-900 px-2 py-1 text-sm font-medium transition-colors">
                  Soluções
                </a>
                <a href="https://blog.geracaodeconteudo.com.br" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 px-2 py-1 text-sm font-medium transition-colors">
                  Blog
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="/#contact" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
              Agende uma conversa
            </a>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="bg-white p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
      <motion.div 
        className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a href="/#why" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">
            Por que
          </a>
          <a href="/#ai" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">
            IA com bom gosto
          </a>
          <a href="/#products" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">
            Soluções
          </a>
          <a href="https://blog.geracaodeconteudo.com.br" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100">
            Blog
          </a>
          <a href="/#contact" className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90">
            Agende uma conversa
          </a>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
