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
import BackToTopButton from "@/components/BackToTopButton";

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
        image="/og-image.jpg"
        organizationJsonLd={true}
        alternateLanguages={[
          { href: "https://geracaodeconteudo.com.br/en", hreflang: "en" },
          { href: "https://geracaodeconteudo.com.br/es", hreflang: "es" }
        ]}
        faqJsonLd={[
          {
            question: "O que são sistemas vivos para vendas inteligentes?",
            answer: "São ecossistemas digitais compostos por bots, IA e webapps que trabalham juntos para automatizar e otimizar o processo de vendas, criando uma presença digital que converte mesmo quando você não está trabalhando."
          },
          {
            question: "Como a Geração de Conteúdo V3 pode ajudar meu negócio?",
            answer: "Criamos arquiteturas digitais que integram automações, IA e sistemas web personalizados para seu negócio, aumentando conversões e reduzindo a necessidade de intervenção manual nos processos de vendas e marketing."
          },
          {
            question: "Quais são os benefícios de usar bots integrados com IA?",
            answer: "Bots integrados com IA permitem atendimento 24/7, qualificação automática de leads, personalização em escala e análise de dados em tempo real, resultando em maior eficiência e taxas de conversão superiores."
          },
          {
            question: "Em quanto tempo posso ver resultados após implementar esses sistemas?",
            answer: "Embora cada projeto seja único, normalmente os clientes começam a ver melhorias significativas nos primeiros 30 dias, com resultados mais expressivos após 90 dias de implementação e otimização contínua."
          }
        ]}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <WhySection />
        <AISection />
        <ProductsSection />
        <ForWhomSection />
        <ManifestoSection />
        <BlogSection />
        <CTASection />
        <SocialLinksSection />
        <BackToTopButton />
      </main>
      <Footer />
    </>
  );
};

export default Home;
