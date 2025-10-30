import { Sofa, Sparkles, Lock, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivateSuitesSectionProps {
  language: 'en' | 'ar';
}

export default function PrivateSuitesSection({ language }: PrivateSuitesSectionProps) {
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Private Suites',
      subtitle: 'Experience ultimate privacy and luxury in your own dedicated space',
      description: 'Our exclusive private suites offer a completely secluded experience for our most discerning clients. Each suite features premium amenities, dedicated styling teams, and personalized service.',
      cta: 'Reserve a Suite',
      features: [
        {
          icon: Lock,
          title: 'Complete Privacy',
          description: 'Fully private entrance and soundproof environment'
        },
        {
          icon: Sofa,
          title: 'Luxury Amenities',
          description: 'Italian leather seating and premium salon equipment'
        },
        {
          icon: Coffee,
          title: 'Concierge Service',
          description: 'Personal attendant and refreshments throughout'
        },
        {
          icon: Sparkles,
          title: 'Premium Products',
          description: 'Exclusive access to luxury product lines'
        }
      ]
    },
    ar: {
      title: 'الأجنحة الخاصة',
      subtitle: 'استمتع بأقصى درجات الخصوصية والفخامة في مساحتك الخاصة',
      description: 'تقدم أجنحتنا الخاصة الحصرية تجربة منعزلة تماماً لعملائنا الأكثر تميزاً. تتميز كل جناح بوسائل راحة متميزة وفرق تصفيف مخصصة وخدمة شخصية.',
      cta: 'احجز جناح',
      features: [
        {
          icon: Lock,
          title: 'خصوصية كاملة',
          description: 'مدخل خاص بالكامل وبيئة عازلة للصوت'
        },
        {
          icon: Sofa,
          title: 'وسائل راحة فاخرة',
          description: 'مقاعد جلدية إيطالية ومعدات صالون متميزة'
        },
        {
          icon: Coffee,
          title: 'خدمة الكونسيرج',
          description: 'مرافق شخصي ومشروبات طوال الوقت'
        },
        {
          icon: Sparkles,
          title: 'منتجات متميزة',
          description: 'وصول حصري إلى خطوط الإنتاج الفاخرة'
        }
      ]
    }
  };

  const t = content[language];

  return (
    <section 
      id="private-suites" 
      className="py-24 lg:py-32 px-6 lg:px-8 bg-background"
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="section-suites"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground tracking-wide" data-testid="text-suites-title">
              {t.title}
            </h2>
            <p className="text-xl text-foreground/90" data-testid="text-suites-subtitle">
              {t.subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-suites-description">
              {t.description}
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-8 hover-elevate active-elevate-2 mt-4"
              data-testid="button-reserve-suite"
            >
              {t.cta}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-card-border rounded-md p-6 hover-elevate transition-all"
                  data-testid={`card-feature-${index}`}
                >
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-serif mb-2 text-foreground" data-testid={`text-feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
