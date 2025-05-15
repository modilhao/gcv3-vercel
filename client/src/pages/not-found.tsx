import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  // Update meta tags for SEO
  useEffect(() => {
    document.title = "Página não encontrada | Geração de Conteúdo V3";
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'A página que você está procurando não foi encontrada. Volte para a página inicial.');
    
    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Página não encontrada | Geração de Conteúdo V3' },
      { property: 'og:description', content: 'A página que você está procurando não foi encontrada. Volte para a página inicial.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
    ];
    
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
    
    // Add noindex tag
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', 'noindex, nofollow');
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Página não encontrada</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600 mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <Link href="/">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Home className="h-4 w-4" />
              Voltar para a página inicial
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
