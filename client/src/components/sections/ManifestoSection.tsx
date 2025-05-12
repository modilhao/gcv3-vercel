import React from "react";

const ManifestoSection: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-900 text-white relative" 
      style={{
        backgroundImage: 'url("/assets/webp/neural-network-bg.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay para melhorar a legibilidade do texto */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Manifesto</h2>
          </div>
          
          <div className="prose prose-lg prose-invert mx-auto">
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-6">
              Não vendemos templates. Vendemos arquitetura.
            </p>
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-6">
              Não criamos automações genéricas, mas sistemas vivos.
            </p>
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-6">
              Preferimos bots que escutam a funis que gritam.
            </p>
            <p className="text-xl md:text-2xl font-serif italic mb-12">
              Eu sou Marcel.
            </p>
            <p className="text-lg font-serif">
              E vou pensar, revisar, ajustar e entregar seu projeto com a mesma atenção que daria ao meu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
