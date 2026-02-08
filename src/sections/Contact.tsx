import { Phone, Instagram, Send, MessageCircle, ExternalLink } from 'lucide-react';
import { companyInfo } from '@/mock';

const Contact = () => {

  const socialLinks = [
    {
      name: 'Instagram',
      handle: companyInfo.socials.instagram,
      url: `https://instagram.com/${companyInfo.socials.instagram.replace('@', '')}`,
      icon: Instagram,
      color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white'
    },
    {
      name: 'VKontakte',
      handle: 'vk.ru/liliyachudo18',
      url: 'https://vk.ru/liliyachudo18',
      icon: MessageCircle,
      color: 'hover:bg-blue-500 hover:text-white'
    },
    {
      name: 'Telegram',
      handle: '@liliyachudo',
      url: 'https://t.me/liliyachudo',
      icon: Send,
      color: 'hover:bg-sky-500 hover:text-white'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-3 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-blue-50 text-brand-blue rounded-full text-sm font-semibold mb-4">
            Контакты
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Свяжитесь с <span className="text-gradient">нами</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            {/* Phone */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <a 
                    href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                    className="text-xl md:text-2xl font-bold text-gray-900 hover:text-brand-pink transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Звоните или пишите в мессенджеры — мы на связи с 9:00 до 21:00
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Мы в социальных сетях</h4>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 transition-all duration-300 ${social.color}`}
                    >
                      <IconComponent className="w-6 h-6" />
                      <div className="flex-1">
                        <p className="font-semibold">{social.name}</p>
                        <p className="text-sm text-gray-500">{social.handle}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Reviews Link */}
            <a
              href="https://vk.ru/liliyachudo18"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-brand-pink to-brand-terracotta rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 text-white hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">Отзывы наших клиентов</h4>
                  <p className="text-white/80 text-sm md:text-base">
                    Более 15000 довольных клиентов — читайте отзывы в VK
                  </p>
                </div>
                <ExternalLink className="w-6 h-6 flex-shrink-0" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
