import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Luxury_Dubai_salon_interior_f3b9a611.png';

interface HeroSectionProps {
  language: 'en' | 'ar';
}

export default function HeroSection({ language }: HeroSectionProps) {
  const isRTL = language === 'ar';

  const content = {
    en: {
      headline: 'Where Celebrity Elegance Meets Dubai Luxury',
      headlineAr: 'حيث تلتقي أناقة المشاهير مع فخامة دبي',
      subheadline: 'Private Sanctuary for Distinguished Clientele',
      cta1: 'Request Private Consultation',
      cta2: 'Virtual Tour',
      badges: [
        'By Appointment Only',
        'Celebrity Clientele',
        'Private Suites Available',
        'VIP Concierge Service'
      ],
      scroll: 'Discover More'
    },
    ar: {
      headline: 'حيث تلتقي أناقة المشاهير مع فخامة دبي',
      headlineAr: 'Where Celebrity Elegance Meets Dubai Luxury',
      subheadline: 'ملاذ خاص للعملاء المتميزين',
      cta1: 'طلب استشارة خاصة',
      cta2: 'جولة افتراضية',
      badges: [
        'بالموعد فقط',
        'عملاء من المشاهير',
        'أجنحة خاصة متاحة',
        'خدمة الكونسيرج VIP'
      ],
      scroll: 'اكتشف المزيد'
    }
  };

  const t = content[language];

  return (
    <section className="relative h-screen w-full overflow-hidden" data-testid="section-hero">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-foreground tracking-wide"
            data-testid="text-hero-headline"
          >
            {language === 'en' ? t.headline : t.headlineAr}
          </h1>

          <p 
            className={`text-xl md:text-2xl font-arabic text-foreground/90 ${isRTL ? 'text-right' : 'text-left'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
            data-testid="text-hero-headline-secondary"
          >
            {language === 'en' ? t.headlineAr : t.headline}
          </p>

          <p 
            className="text-lg md:text-xl font-light text-foreground/80"
            data-testid="text-hero-subheadline"
          >
            {t.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-delay">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-6 text-base shadow-xl hover-elevate active-elevate-2"
              style={{ boxShadow: 'var(--shadow-lg)' }}
              data-testid="button-consultation"
            >
              {t.cta1}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-foreground px-8 py-6 text-base backdrop-blur-sm bg-background/20 hover-elevate active-elevate-2 overflow-hidden relative"
              data-testid="button-virtual-tour"
            >
              <span className="relative z-10">{t.cta2}</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer"
                style={{ backgroundSize: '200% 100%' }}
              />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
            {t.badges.map((badge, index) => (
              <div
                key={index}
                className="border border-primary/50 bg-background/10 backdrop-blur-sm px-4 py-3 rounded-md animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
                data-testid={`badge-${index}`}
              >
                <p className="text-xs md:text-sm text-foreground/90 tracking-wide">
                  {badge}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
          <p className="text-xs text-foreground/70 tracking-luxury uppercase" data-testid="text-scroll-indicator">
            {t.scroll}
          </p>
          <ChevronDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
}
