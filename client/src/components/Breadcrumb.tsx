import React, { useMemo } from 'react';
import { Link } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  className?: string;
}

/**
 * Componente de breadcrumb com suporte a SEO (JSON-LD BreadcrumbList)
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, homeHref = '/', className = '' }) => {
  // Construir os itens do breadcrumb incluindo a home
  const allItems = useMemo(() => {
    return [
      { label: 'Home', href: homeHref },
      ...items
    ];
  }, [items, homeHref]);

  // Gerar o JSON-LD para BreadcrumbList
  const jsonLdScript = useMemo(() => {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: allItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href ? `https://geracaodeconteudo.com.br${item.href}` : undefined
      }))
    };

    return JSON.stringify(jsonLdData);
  }, [allItems]);

  return (
    <>
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />

      {/* Interface visual do breadcrumb */}
      <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              )}
              
              {item.href && index < allItems.length - 1 ? (
                <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {index === 0 ? <Home className="h-4 w-4" /> : item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {index === 0 ? <Home className="h-4 w-4" /> : item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;