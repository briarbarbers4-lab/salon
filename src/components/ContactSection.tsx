import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactSectionProps {
  language: 'en' | 'ar';
}

export default function ContactSection({ language }: ContactSectionProps) {
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Visit Us',
      subtitle: 'Experience luxury at our exclusive Dubai location',
      cta: 'Get Directions',
      info: [
        {
          icon: MapPin,
          label: 'Address',
          value: 'Jumeirah Beach Road, Dubai, UAE'
        },
        {
          icon: Phone,
          label: 'Phone',
          value: '+971 50 123 4567'
        },
        {
          icon: Mail,
          label: 'Email',
          value: 'concierge@elitesanctuary.ae'
        },
        {
          icon: Clock,
          label: 'Hours',
          value: 'By Appointment Only'
        }
      ]
    },
    ar: {
      title: 'قم بزيارتنا',
      subtitle: 'استمتع بالفخامة في موقعنا الحصري في دبي',
      cta: 'احصل على الاتجاهات',
      info: [
        {
          icon: MapPin,
          label: 'العنوان',
          value: 'شارع جميرا بيتش، دبي، الإمارات'
        },
        {
          icon: Phone,
          label: 'الهاتف',
          value: '+971 50 123 4567'
        },
        {
          icon: Mail,
          label: 'البريد الإلكتروني',
          value: 'concierge@elitesanctuary.ae'
        },
        {
          icon: Clock,
          label: 'الساعات',
          value: 'بالموعد فقط'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section 
      id="contact" 
      className="py-24 lg:py-32 px-6 lg:px-8 bg-card"
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground tracking-wide" data-testid="text-contact-title">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.info.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-background border border-card-border rounded-md p-6 text-center hover-elevate transition-all"
                data-testid={`card-contact-${index}`}
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-sm font-medium text-muted-foreground mb-2" data-testid={`text-contact-label-${index}`}>
                  {item.label}
                </h3>
                <p className="text-foreground" data-testid={`text-contact-value-${index}`}>
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground px-8 hover-elevate active-elevate-2"
            data-testid="button-directions"
          >
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
