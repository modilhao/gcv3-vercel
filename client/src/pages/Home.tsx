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

  // Update meta tags for SEO
  useEffect(() => {
    document.title = "Geração de Conteúdo V3 – Sistemas vivos para vendas inteligentes";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Ecossistemas digitais com bots, IA e webapps para empresas B2B. Sistemas vivos que convertem enquanto você dorme.');
    
    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Geração de Conteúdo V3 – Sistemas vivos para vendas inteligentes' },
      { property: 'og:description', content: 'Ecossistemas digitais com bots, IA e webapps para empresas B2B. Sistemas vivos que convertem enquanto você dorme.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://geracaodeconteudo.com.br' },
      { property: 'og:image', content: 'https://geracaodeconteudo.com.br/assets/og-image.jpg' },
    ];
    
    // Set Twitter tags
    ogTags.push({ property: 'twitter:card', content: 'summary_large_image' });
    ogTags.push({ property: 'twitter:title', content: 'Geração de Conteúdo V3 – Sistemas vivos para vendas inteligentes' });
    ogTags.push({ property: 'twitter:description', content: 'Ecossistemas digitais com bots, IA e webapps para empresas B2B. Sistemas vivos que convertem enquanto você dorme.' });
    ogTags.push({ property: 'twitter:image', content: 'https://geracaodeconteudo.com.br/assets/og-image.jpg' });
    
    // Adicionar link canônico
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://geracaodeconteudo.com.br');
    
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, []);

  return (
    <>
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
