import React, { useEffect } from 'react';
import { DEFAULT_SEO } from '@/lib/seoDefaults';

// Corrige tipagem do Vite para import.meta.env
/// <reference types="vite/client" />

type SeoProps = Partial<typeof DEFAULT_SEO> & {
  articleJsonLd?: boolean;
  organizationJsonLd?: boolean;
  faqJsonLd?: Array<{question: string, answer: string}>;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  alternateLanguages?: Array<{href: string, hreflang: string}>;
  /**
   * Palavras para destacar em negrito no preview visual da meta descrição (apenas em dev)
   */
  boldWords?: string[];
};

/**
 * Componente que gerencia as meta tags de SEO
 * Uso: <SEO title="Minha página" description="Descrição da página" boldWords={["IA", "bots"]} />
 *
 * Em ambiente de desenvolvimento, exibe um preview visual do snippet do Google/social,
 * com as palavras em boldWords destacadas em <b> na descrição.
 */
const SEO: React.FC<SeoProps> = ({ 
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  image = DEFAULT_SEO.image,
  url = DEFAULT_SEO.url,
  siteName = DEFAULT_SEO.siteName,
  locale = DEFAULT_SEO.locale,
  type = DEFAULT_SEO.type,
  twitterSite = DEFAULT_SEO.twitterSite,
  twitterCreator = DEFAULT_SEO.twitterCreator,
  articleJsonLd = false,
  organizationJsonLd = false,
  faqJsonLd,
  publishedTime,
  modifiedTime,
  tags = [],
  alternateLanguages = [],
  boldWords = []
}) => {
  useEffect(() => {
    // Limpeza de tags antigas antes de adicionar novas
    // Remove meta OG, Twitter, alternates, canonical, JSON-LD, etc
    const removeTags = (selector: string) => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    };
    removeTags('meta[property^="og:"]');
    removeTags('meta[property^="article:"]');
    removeTags('meta[property^="twitter:"]');
    removeTags('meta[name="twitter:card"]');
    removeTags('meta[name="twitter:title"]');
    removeTags('meta[name="twitter:description"]');
    removeTags('meta[name="twitter:image"]');
    removeTags('meta[name="twitter:site"]');
    removeTags('meta[name="twitter:creator"]');
    removeTags('link[rel="canonical"]');
    removeTags('link[rel="alternate"]');
    removeTags('script#organization-jsonld');
    removeTags('script#article-jsonld');
    removeTags('script#faq-jsonld');
    
    // Atualizar title
    document.title = title;
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Meta canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
    
    // Adicionar links de idioma alternativo (hreflang)
    // Primeiro, remover quaisquer tags hreflang existentes
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Adicionar link para o idioma padrão (self-referencing)
    const defaultLanguageLink = document.createElement('link');
    defaultLanguageLink.setAttribute('rel', 'alternate');
    defaultLanguageLink.setAttribute('hreflang', locale.replace('_', '-'));
    defaultLanguageLink.setAttribute('href', url);
    document.head.appendChild(defaultLanguageLink);
    
    // Adicionar links para idiomas alternativos
    alternateLanguages.forEach(({ href, hreflang }) => {
      const langLink = document.createElement('link');
      langLink.setAttribute('rel', 'alternate');
      langLink.setAttribute('hreflang', hreflang);
      langLink.setAttribute('href', href);
      document.head.appendChild(langLink);
    });
    
    // Adicionar x-default para idioma padrão para usuários sem preferência de idioma
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', url);
    document.head.appendChild(xDefaultLink);
    
    // Adicionar preconnect para domínios externos comuns para melhorar performance
    const preconnectUrls = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com'
    ];
    
    preconnectUrls.forEach(preconnectUrl => {
      if (!document.querySelector(`link[rel="preconnect"][href="${preconnectUrl}"]`)) {
        const preconnectLink = document.createElement('link');
        preconnectLink.setAttribute('rel', 'preconnect');
        preconnectLink.setAttribute('href', preconnectUrl);
        preconnectLink.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(preconnectLink);
      }
    });
    
    // Construir URL absoluta para a imagem se for fornecida uma URL relativa
    const absoluteImageUrl = image.startsWith('http')
      ? image
      : `https://geracaodeconteudo.com.br${image}`;
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: absoluteImageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },
    ];
    
    // Adicionar tags específicas para artigos
    if (type === 'article') {
      if (publishedTime) {
        ogTags.push({ property: 'article:published_time', content: publishedTime });
      }
      if (modifiedTime) {
        ogTags.push({ property: 'article:modified_time', content: modifiedTime });
      }
      // Adicionar tags de artigo
      tags.forEach(tag => {
        ogTags.push({ property: 'article:tag', content: tag });
      });
    }
    
    // Twitter tags
    const twitterTags = [
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: title },
      { property: 'twitter:description', content: description },
      { property: 'twitter:image', content: absoluteImageUrl },
      { property: 'twitter:site', content: twitterSite },
      { property: 'twitter:creator', content: twitterCreator },
    ];
    
    // Função para atualizar ou criar meta tags
    const updateMetaTags = (tags: {property: string, content: string}[]) => {
      tags.forEach(({ property, content }) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      });
    };
    
    // Atualizar todas as tags
    updateMetaTags([...ogTags, ...twitterTags]);
    
    // Adicionar JSON-LD para artigos
    if (articleJsonLd && type === 'article') {
      let jsonLdScript = document.querySelector('script#article-jsonld');
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.setAttribute('id', 'article-jsonld');
        jsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLdScript);
      }
      
      const jsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: absoluteImageUrl,
        url: url,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: 'https://geracaodeconteudo.com.br/apple-touch-icon.png'
          }
        }
      };
      
      jsonLdScript.textContent = JSON.stringify(jsonLdData);
    }
    
    // Adicionar JSON-LD para a organização
    if (organizationJsonLd || (type === 'website' && url === DEFAULT_SEO.url)) {
      let orgJsonLdScript = document.querySelector('script#organization-jsonld');
      if (!orgJsonLdScript) {
        orgJsonLdScript = document.createElement('script');
        orgJsonLdScript.setAttribute('id', 'organization-jsonld');
        orgJsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(orgJsonLdScript);
      }
      
      // Construir URL absoluta para o logo
      const logoUrl = 'https://geracaodeconteudo.com.br/apple-touch-icon.png';
      
      const orgJsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: DEFAULT_SEO.url,
        logo: logoUrl,
        image: absoluteImageUrl,
        sameAs: [
          'https://twitter.com/gdeconteudo',
          'https://www.linkedin.com/company/geracao-de-conteudo',
          'https://www.instagram.com/geracaodeconteudo'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+5511999999999',
          contactType: 'customer service',
          email: 'contato@geracaodeconteudo.com.br',
          availableLanguage: ['Portuguese']
        }
      };
      
      orgJsonLdScript.textContent = JSON.stringify(orgJsonLdData);
    }
    
    // Adicionar JSON-LD para FAQ
    if (faqJsonLd && faqJsonLd.length > 0) {
      let faqJsonLdScript = document.querySelector('script#faq-jsonld');
      if (!faqJsonLdScript) {
        faqJsonLdScript = document.createElement('script');
        faqJsonLdScript.setAttribute('id', 'faq-jsonld');
        faqJsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(faqJsonLdScript);
      }
      
      const faqJsonLdData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqJsonLd.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      };
      
      faqJsonLdScript.textContent = JSON.stringify(faqJsonLdData);
    }
    
  }, [title, description, image, url, siteName, locale, type, twitterSite, twitterCreator, articleJsonLd, organizationJsonLd, faqJsonLd, publishedTime, modifiedTime, tags, alternateLanguages, boldWords]);

  const isDev = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.DEV) || (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development');
  if (isDev) {
    // Função para destacar palavras em negrito
    const highlightWords = (text: string, words: string[]) => {
      if (!words.length) return text;
      // Regex para cada palavra, ignorando case
      const pattern = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
      return text.split(pattern).map((part, i) =>
        words.some(w => w.toLowerCase() === part.toLowerCase()) ? <b key={i}>{part}</b> : part
      );
    };
    return (
      <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16, margin: '16px 0', background: '#fafbfc'}}>
        <div style={{fontSize: 18, fontWeight: 600, color: '#1a0dab', marginBottom: 4}}>{title}</div>
        <div style={{color: '#006621', fontSize: 14, marginBottom: 4}}>{url}</div>
        <div style={{fontSize: 15, color: '#545454'}}>{highlightWords(description, boldWords)}</div>
        <div style={{marginTop: 8}}>
          <img src={image?.startsWith('http') ? image : `https://geracaodeconteudo.com.br${image}`} alt="Preview" style={{maxWidth: 300, borderRadius: 4}} />
        </div>
        <div style={{fontSize: 12, color: '#888', marginTop: 8}}>
          <b>Preview visual do snippet Google/social (apenas em dev)</b>
        </div>
      </div>
    );
  }

  return null; // Este componente não renderiza nada visualmente em produção
};

export default SEO;