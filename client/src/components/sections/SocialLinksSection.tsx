import React from "react";

const SocialLinksSection: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">🌐 Estamos em outras plataformas</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-1">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">Blog no Hashnode</h3>
              <p className="text-neutral-600 font-serif mb-4">
                Publicamos ideias, frameworks e provocações sobre o futuro do marketing B2B.
              </p>
              <a 
                href="https://geracaodeconteudo.hashnode.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/90 font-medium"
              >
                Acessar Blog
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">X (antigo Twitter)</h3>
              <p className="text-neutral-600 font-serif mb-4">
                Insights em 280 caracteres. Atualizações rápidas sobre o que estamos construindo.
              </p>
              <a 
                href="https://x.com/gdeconteudo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/90 font-medium"
              >
                Ver no X
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-3">LinkedIn</h3>
              <p className="text-neutral-600 font-serif mb-4">
                Reflexões profundas, bastidores e posicionamentos estratégicos sobre IA, inovação e marketing para negócios.
              </p>
              <a 
                href="https://www.linkedin.com/in/marcelambiente/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-accent hover:text-accent/90 font-medium"
              >
                Ver no LinkedIn
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;