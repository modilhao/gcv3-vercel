import React from "react";

const CTASection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Vamos criar um ecossistema digital para o seu crescimento?
          </h2>
          <p className="text-xl text-neutral-600 mb-10 font-serif">
            Sem promessas vazias. Com inteligência real.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div id="cta-calendar-button" className="inline-block">
              {/* Botão de agendamento será injetado aqui pelo script do Google Calendar */}
            </div>
            <a 
              href="#products"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-base font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Veja exemplos reais
            </a>
            
            {/* Google Calendar Appointment Scheduling para o botão do CTA */}
            <script dangerouslySetInnerHTML={{ __html: `
              (function() {
                var target = document.getElementById('cta-calendar-button');
                window.addEventListener('load', function() {
                  if (window.calendar && window.calendar.schedulingButton) {
                    calendar.schedulingButton.load({
                      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ12tsOO0WYlIgcGyAuJB88cZAEwUROR5XPcx0_QMI5EKNGTfxSILp-uI49NKzNjWZjYfc4Vwglg?gv=true',
                      color: '#f7931a',
                      label: "Agende uma conversa",
                      target,
                    });
                  }
                });
              })();
            `}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
