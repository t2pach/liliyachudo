import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, ArrowDown } from 'lucide-react';
import { services, iconMap } from '@/mock';
import type { Service } from '@/mock';

// Scroll to element with delay
const scrollToElement = (element: HTMLElement | null) => {
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
};

const ServiceCard = ({ 
  service, 
  isActive, 
  onClick 
}: { 
  service: Service; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  const IconComponent = iconMap[service.icon];

  return (
    <div 
      className={`
        relative bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 
        transition-all duration-500 ease-out cursor-pointer
        ${isActive 
          ? 'ring-2 md:ring-4 ring-brand-pink shadow-xl scale-[1.02]' 
          : 'shadow-md hover:shadow-lg hover:-translate-y-1'
        }
      `}
      onClick={onClick}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4
        ${isActive ? 'bg-brand-pink text-white' : 'bg-pink-50 text-brand-pink'}
        transition-colors duration-300
      `}>
        {IconComponent && <IconComponent className="w-6 h-6 md:w-7 md:h-7" />}
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
        {service.title}
      </h3>

      {/* Short Description */}
      <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
        {service.shortDescription}
      </p>

      {/* Action hint */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-brand-pink font-medium">
          {isActive ? 'Свернуть' : 'Подробнее'}
        </span>
        <ChevronDown 
          className={`
            w-5 h-5 text-gray-400 transition-transform duration-300
            ${isActive ? 'rotate-180 text-brand-pink' : ''}
          `}
        />
      </div>
    </div>
  );
};

const ServiceDetail = ({ 
  service, 
  onClose 
}: { 
  service: Service; 
  onClose: () => void;
}) => {
  const IconComponent = iconMap[service.icon];
  const featuresRef = useRef<HTMLDivElement>(null);

  // Scroll to features section when component mounts or when details are shown
  useEffect(() => {
    scrollToElement(featuresRef.current);
  }, []);

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-pink/10 to-brand-terracotta/10 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-brand-pink text-white flex items-center justify-center flex-shrink-0">
              {IconComponent && <IconComponent className="w-6 h-6 md:w-7 md:h-7" />}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mt-1">{service.shortDescription}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Description */}
        <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
          {service.description}
        </p>

        {/* Features Section - Highlighted */}
        <div ref={featuresRef} className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-pink text-white flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-gray-900">Что входит в услугу</h4>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm md:text-base text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <div className="mb-6 md:mb-8">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Галерея:</h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {service.gallery.map((image, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-xl overflow-hidden bg-gray-100"
              >
                <img
                  src={image}
                  alt={`${service.title} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
                        <svg class="w-8 h-8 text-brand-pink/50 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span class="text-xs text-brand-pink/70">Фото ${index + 1}</span>
                      </div>
                    `;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 text-center">
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-pink text-white font-semibold rounded-xl hover:bg-opacity-90 hover:shadow-glow transition-all"
          >
            Узнать стоимость
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (id: number) => {
    const newActiveId = activeService === id ? null : id;
    setActiveService(newActiveId);
  };

  // Scroll to detail when service is activated
  useEffect(() => {
    if (activeService !== null) {
      scrollToElement(detailRef.current);
    }
  }, [activeService]);

  const activeServiceData = activeService !== null 
    ? services.find(s => s.id === activeService) 
    : null;

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-pink-50 text-brand-pink rounded-full text-sm font-semibold mb-4">
            Наши услуги
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Организуем <span className="text-gradient">любой праздник</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите тип мероприятия, чтобы узнать подробнее о наших услугах
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isActive={activeService === service.id}
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div>

        {/* Active Service Detail */}
        {activeServiceData && (
          <div ref={detailRef} className="mt-8 md:mt-12">
            <ServiceDetail 
              service={activeServiceData}
              onClose={() => setActiveService(null)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
