import React from "react";

const AISection: React.FC = () => {
  return (
    <section id="ai" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full max-w-xs relative">
                  <div className="absolute w-3 h-3 bg-primary/60 rounded-full top-1/4 left-1/4"></div>
                  <div className="absolute w-4 h-4 bg-primary/80 rounded-full top-3/4 right-1/3"></div>
                  <div className="absolute w-3 h-3 bg-primary rounded-full bottom-1/4 left-2/3"></div>
                  <div className="absolute w-2 h-2 bg-primary/40 rounded-full top-1/2 right-1/4"></div>
                  <div className="absolute h-px bg-primary/40 transform rotate-45 w-24 top-1/4 left-1/4"></div>
                  <div className="absolute h-px bg-primary/40 transform -rotate-45 w-32 top-3/4 right-1/3"></div>
                  <div className="absolute h-px bg-primary/40 w-24 bottom-1/4 left-2/3"></div>
                </div>
              </div>
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
