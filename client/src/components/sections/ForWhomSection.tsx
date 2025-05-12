import React from "react";

const ForWhomSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Para quem é</h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-center">
            <p className="text-xl font-serif leading-relaxed mb-6">
              Se você vende para empresas. Se sua venda depende de conversas.<br/>
              Se seu cliente tem múltiplos decisores e seu ciclo leva semanas ou meses.<br/>
              Se sua equipe já não pode mais perder tempo com leads frios ou pipelines manuais...
            </p>
            <p className="text-xl font-bold mb-6">
              <strong>Então este ecossistema é para você.</strong>
            </p>
            <p className="text-lg font-serif">
              Atendemos empresas B2B que querem crescer com inteligência, não com suor e sorte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;