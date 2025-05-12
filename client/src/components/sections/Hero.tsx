import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-bl from-primary/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/5 via-transparent to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
            Ecossistemas digitais para o seu crescimento
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-600 leading-relaxed font-serif">
            Arquitetamos ecossistemas digitais que escutam, aprendem e convertem — enquanto você dorme.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a 
              href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ12tsOO0WYlIgcGyAuJB88cZAEwUROR5XPcx0_QMI5EKNGTfxSILp-uI49NKzNjWZjYfc4Vwglg?gv=true" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-white rounded-lg shadow-sm hover:bg-primary/90 transition-all duration-200 font-medium"
            >
              Agende uma conversa
            </a>
            <a href="#products" className="px-6 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg shadow-sm hover:bg-neutral-50 transition-all duration-200 font-medium">
              Ver soluções
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
