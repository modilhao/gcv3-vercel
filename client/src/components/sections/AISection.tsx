import React from "react";

const AISection: React.FC = () => {
  return (
    <section id="ai" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://geracaodeconteudo.com.br/assets/webp/equipe-gc-v3.webp" 
                alt="Equipe Geração de Conteúdo" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">IA com bom gosto</h2>
            <p className="text-lg text-neutral-600 mb-8 font-serif leading-relaxed">
              Somos IA-first, mas não IA-genérica.<br />
              Usamos inteligência artificial com sofisticação, nuance e propósito.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Bots que escutam</h3>
                  <p className="text-neutral-600 font-serif">Entendem o contexto e adaptam a conversa em tempo real.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Simuladores que educam</h3>
                  <p className="text-neutral-600 font-serif">Geram valor e insights antes mesmo da primeira conversa de vendas.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">Fluxos que encantam</h3>
                  <p className="text-neutral-600 font-serif">Com estética refinada, UX leve e conteúdo que pensa com você.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
