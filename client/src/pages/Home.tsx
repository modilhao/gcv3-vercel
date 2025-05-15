import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhySection from "@/components/sections/WhySection";
import AISection from "@/components/sections/AISection";
import ProductsSection from "@/components/sections/ProductsSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import BlogSection from "@/components/sections/BlogSection";
import CTASection from "@/components/sections/CTASection";
import SocialLinksSection from "@/components/sections/SocialLinksSection";
import SEO from "@/components/SEO";

const Home: React.FC = () => {
  // Intersection Observer for fade-in animations
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    };
    
    animateOnScroll();
    
    // Clean up
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  // Componente SEO para gerenciar meta tags
  const pageTitle = "Geração de Conteúdo V3 – Sistemas vivos para vendas inteligentes";
  const pageDescription = "Ecossistemas digitais com bots, IA e webapps para empresas B2B. Sistemas vivos que convertem enquanto você dorme.";

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        url="https://geracaodeconteudo.com.br"
        image="https://geracaodeconteudo.com.br/assets/og-image.jpg"
        organizationJsonLd={true}
      />
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <AISection />
        <ProductsSection />
        <ForWhomSection />
        <ManifestoSection />
        <BlogSection />
        <CTASection />
        <SocialLinksSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
