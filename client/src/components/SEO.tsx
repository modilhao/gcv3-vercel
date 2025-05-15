import React, { useEffect } from 'react';
import { DEFAULT_SEO } from '@/lib/seoDefaults';

type SeoProps = Partial<typeof DEFAULT_SEO> & {
  articleJsonLd?: boolean;
  organizationJsonLd?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

/**
 * Componente que gerencia as meta tags de SEO
 * Uso: <SEO title="Minha página" description="Descrição da página" />
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
  publishedTime,
  modifiedTime,
  tags = []
}) => {
  useEffect(() => {
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
    
  }, [title, description, image, url, siteName, locale, type, twitterSite, twitterCreator, articleJsonLd, organizationJsonLd, publishedTime, modifiedTime, tags]);
  
  return null; // Este componente não renderiza nada visualmente
};

export default SEO;