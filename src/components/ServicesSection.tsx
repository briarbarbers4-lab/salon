import { Scissors, Sparkles, Crown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesSectionProps {
  language: 'en' | 'ar';
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Exclusive Services',
      subtitle: 'Curated treatments for the most discerning clientele',
      cta: 'View All Services',
      services: [
        {
          icon: Crown,
          title: 'Celebrity Styling',
          description: 'Personalized styling sessions with internationally acclaimed stylists',
          price: 'From AED 2,500'
        },
        {
          icon: Scissors,
          title: 'Precision Cuts',
          description: 'Master craftsmen delivering perfection with every cut',
          price: 'From AED 1,800'
        },
        {
          icon: Sparkles,
          title: 'Luxury Treatments',
          description: 'Premium hair and scalp treatments using exclusive products',
          price: 'From AED 3,200'
        },
        {
          icon: Heart,
          title: 'Bridal Packages',
          description: 'Complete wedding day preparation in our private suites',
          price: 'From AED 8,500'
        }
      ]
    },
    ar: {
      title: 'الخدمات الحصرية',
      subtitle: 'علاجات منسقة للعملاء الأكثر تميزاً',
      cta: 'عرض جميع الخدمات',
      services: [
        {
          icon: Crown,
          title: 'تصفيف المشاهير',
          description: 'جلسات تصفيف شخصية مع مصممين معتمدين دولياً',
          price: 'من 2,500 درهم'
        },
        {
          icon: Scissors,
          title: 'قصات دقيقة',
          description: 'حرفيون متقنون يقدمون الكمال مع كل قصة',
          price: 'من 1,800 درهم'
        },
        {
          icon: Sparkles,
          title: 'علاجات فاخرة',
          description: 'علاجات فاخرة للشعر وفروة الرأس باستخدام منتجات حصرية',
          price: 'من 3,200 درهم'
        },
        {
          icon: Heart,
          title: 'باقات العروس',
          description: 'إعداد كامل ليوم الزفاف في أجنحتنا الخاصة',
          price: 'من 8,500 درهم'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section 
      id="services" 
      className="py-24 lg:py-32 px-6 lg:px-8 bg-card"
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground tracking-wide" data-testid="text-services-title">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-background border border-card-border rounded-md p-8 hover-elevate transition-all"
                data-testid={`card-service-${index}`}
              >
                <Icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-3 text-foreground" data-testid={`text-service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4" data-testid={`text-service-description-${index}`}>
                  {service.description}
                </p>
                <p className="text-sm text-primary font-medium" data-testid={`text-service-price-${index}`}>
                  {service.price}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground px-8 hover-elevate active-elevate-2"
            data-testid="button-view-services"
          >
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
