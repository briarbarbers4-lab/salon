import { useState } from 'react';
import { Clock, Calculator, Users, Eye, Sparkles, Car, Camera, Phone as PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import hairStylingImg from '@assets/generated_images/Luxury_hair_styling_service_8b20fcfb.png';
import skincareImg from '@assets/generated_images/Elite_skincare_facial_treatment_8535f969.png';
import nailArtImg from '@assets/generated_images/Luxury_nail_artistry_service_90183da9.png';
import bridalImg from '@assets/generated_images/Bridal_couture_beauty_service_f1cbb294.png';
import marbleTexture from '@assets/stock_images/white_marble_texture_538ab711.jpg';
import stylist1Img from '@assets/generated_images/Celebrity_stylist_portrait_female_c8cfdf0b.png';
import stylist2Img from '@assets/generated_images/Celebrity_stylist_portrait_male_50ec9e09.png';

interface OpulentServicesSectionProps {
  language: 'en' | 'ar';
}

interface Service {
  category: string;
  categoryAr: string;
  image: string;
  treatments: {
    name: string;
    nameAr: string;
    duration: number;
    price: number;
  }[];
  priceLabel: string;
  priceLabelAr: string;
}

const services: Service[] = [
  {
    category: 'Signature Treatments',
    categoryAr: 'العلاجات المميزة',
    image: hairStylingImg,
    treatments: [
      { name: 'Private Suite Hair Styling', nameAr: 'تصفيف الشعر في جناح خاص', duration: 120, price: 2500 },
      { name: 'Red Carpet Makeup Artistry', nameAr: 'فن مكياج السجادة الحمراء', duration: 90, price: 3200 },
      { name: 'Exclusive Color Transformation', nameAr: 'تحويل اللون الحصري', duration: 180, price: 4500 },
      { name: 'Precision Hair Extensions', nameAr: 'وصلات الشعر الدقيقة', duration: 240, price: 5800 },
    ],
    priceLabel: 'From AED 2,500',
    priceLabelAr: 'من 2,500 درهم'
  },
  {
    category: 'Elite Skincare',
    categoryAr: 'العناية بالبشرة النخبوية',
    image: skincareImg,
    treatments: [
      { name: '24K Gold Facial Treatment', nameAr: 'علاج الوجه بالذهب عيار 24', duration: 90, price: 1800 },
      { name: 'Diamond Microdermabrasion', nameAr: 'تقشير الماس الدقيق', duration: 75, price: 2200 },
      { name: 'Caviar Rejuvenation Therapy', nameAr: 'علاج تجديد الكافيار', duration: 120, price: 3500 },
      { name: 'Private Spa Rituals', nameAr: 'طقوس السبا الخاصة', duration: 150, price: 4200 },
    ],
    priceLabel: 'From AED 1,800',
    priceLabelAr: 'من 1,800 درهم'
  },
  {
    category: 'Luxury Nail Artistry',
    categoryAr: 'فن الأظافر الفاخر',
    image: nailArtImg,
    treatments: [
      { name: 'Swarovski Crystal Designs', nameAr: 'تصاميم كريستال سواروفسكي', duration: 60, price: 800 },
      { name: '3D Sculptural Nails', nameAr: 'أظافر نحتية ثلاثية الأبعاد', duration: 90, price: 1200 },
      { name: 'VIP Gel Systems', nameAr: 'أنظمة الجل VIP', duration: 45, price: 650 },
      { name: 'Private Pedicure Suites', nameAr: 'أجنحة باديكير خاصة', duration: 75, price: 950 },
    ],
    priceLabel: 'From AED 800',
    priceLabelAr: 'من 800 درهم'
  },
  {
    category: 'Bridal Couture',
    categoryAr: 'الأزياء الراقية للعروس',
    image: bridalImg,
    treatments: [
      { name: 'Multi-Day Bridal Packages', nameAr: 'باقات الزفاف متعددة الأيام', duration: 480, price: 15000 },
      { name: 'Pre-Wedding Preparation', nameAr: 'الإعداد لما قبل الزفاف', duration: 180, price: 5500 },
      { name: 'Day-of Styling Team', nameAr: 'فريق التصفيف ليوم الزفاف', duration: 360, price: 12000 },
      { name: 'Destination Wedding Services', nameAr: 'خدمات حفلات الزفاف الوجهة', duration: 600, price: 25000 },
    ],
    priceLabel: 'Bespoke Pricing',
    priceLabelAr: 'تسعير مخصص'
  }
];

const stylists = [
  {
    name: 'Isabella Laurent',
    nameAr: 'إيزابيلا لوران',
    specialty: 'Celebrity Hair Artistry',
    specialtyAr: 'فن تصفيف المشاهير',
    image: stylist1Img,
    experience: '15+ years'
  },
  {
    name: 'Marcus Bellini',
    nameAr: 'ماركوس بيليني',
    specialty: 'Red Carpet Makeup',
    specialtyAr: 'مكياج السجادة الحمراء',
    image: stylist2Img,
    experience: '12+ years'
  }
];

const vipAddons = [
  { icon: Car, name: 'Private Car Service', nameAr: 'خدمة السيارة الخاصة', price: 500 },
  { icon: Sparkles, name: 'In-Suite Refreshments', nameAr: 'المرطبات داخل الجناح', price: 300 },
  { icon: Camera, name: 'Personal Photographer', nameAr: 'مصور شخصي', price: 1200 },
  { icon: PhoneIcon, name: '24/7 Emergency Availability', nameAr: 'توفر الطوارئ على مدار الساعة', price: 800 },
];

export default function OpulentServicesSection({ language }: OpulentServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Bespoke Beauty Experiences',
      titleAr: 'تجارب جمال مخصصة',
      subtitle: 'Curated exclusively for discerning clientele',
      inquire: 'Inquire',
      calculator: 'Duration Calculator',
      builder: 'Treatment Builder',
      stylists: 'Celebrity Stylists',
      beforeAfter: 'Before/After',
      vipAddons: 'VIP Add-Ons',
      totalTime: 'Total Time',
      totalPrice: 'Total Price',
      minutes: 'minutes',
      selectTreatments: 'Select treatments to build your package',
      selectStylists: 'Choose your expert stylist',
      cta: 'Schedule Private Consultation',
      aed: 'AED'
    },
    ar: {
      title: 'تجارب جمال مخصصة',
      titleAr: 'Bespoke Beauty Experiences',
      subtitle: 'منسقة حصرياً للعملاء المميزين',
      inquire: 'استفسر',
      calculator: 'حاسبة المدة',
      builder: 'باني العلاج',
      stylists: 'مصففو المشاهير',
      beforeAfter: 'قبل/بعد',
      vipAddons: 'إضافات VIP',
      totalTime: 'الوقت الإجمالي',
      totalPrice: 'السعر الإجمالي',
      minutes: 'دقيقة',
      selectTreatments: 'اختر العلاجات لبناء باقتك',
      selectStylists: 'اختر مصففك الخبير',
      cta: 'جدولة استشارة خاصة',
      aed: 'درهم'
    }
  };

  const t = content[language];

  const toggleTreatment = (serviceName: string, treatmentName: string) => {
    const key = `${serviceName}-${treatmentName}`;
    setSelectedTreatments(prev =>
      prev.includes(key) ? prev.filter(t => t !== key) : [...prev, key]
    );
  };

  const toggleAddon = (addonName: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonName) ? prev.filter(a => a !== addonName) : [...prev, addonName]
    );
  };

  const calculateTotals = () => {
    let totalTime = 0;
    let totalPrice = 0;

    selectedTreatments.forEach(key => {
      const [serviceName, treatmentName] = key.split('-');
      const service = services.find(s => s.category === serviceName);
      if (service) {
        const treatment = service.treatments.find(t => t.name === treatmentName);
        if (treatment) {
          totalTime += treatment.duration;
          totalPrice += treatment.price;
        }
      }
    });

    selectedAddons.forEach(addonName => {
      const addon = vipAddons.find(a => a.name === addonName);
      if (addon) {
        totalPrice += addon.price;
      }
    });

    return { totalTime, totalPrice };
  };

  const { totalTime, totalPrice } = calculateTotals();

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundColor: '#F5F3EE',
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="section-opulent-services"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${marbleTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide inline-block"
            style={{ color: '#0A0A0A' }}
            data-testid="text-services-main-title"
          >
            {language === 'en' ? t.title : t.titleAr}
            <div className="h-1 w-32 mx-auto mt-4" style={{ backgroundColor: '#D4AF37' }} />
          </h2>
          <p
            className="text-2xl font-arabic"
            style={{ color: '#0A0A0A' }}
            data-testid="text-services-title-secondary"
          >
            {language === 'en' ? t.titleAr : t.title}
          </p>
          <p className="text-lg" style={{ color: '#666' }} data-testid="text-services-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hover-elevate active-elevate-2"
                style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                data-testid="button-calculator"
              >
                <Clock className="mr-2 h-4 w-4" />
                {t.calculator}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl" style={{ color: '#D4AF37' }}>
                  {t.calculator}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.category} className="space-y-2">
                    <h3 className="font-serif text-lg">{language === 'en' ? service.category : service.categoryAr}</h3>
                    {service.treatments.map((treatment) => (
                      <div key={treatment.name} className="flex items-center justify-between p-2 hover-elevate rounded-md">
                        <span className="text-sm">{language === 'en' ? treatment.name : treatment.nameAr}</span>
                        <span className="text-sm" style={{ color: '#D4AF37' }}>{treatment.duration} {t.minutes}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hover-elevate active-elevate-2"
                style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                data-testid="button-builder"
              >
                <Calculator className="mr-2 h-4 w-4" />
                {t.builder}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl" style={{ color: '#D4AF37' }}>
                  {t.builder}
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="treatments">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="treatments">Treatments</TabsTrigger>
                  <TabsTrigger value="addons">VIP Add-Ons</TabsTrigger>
                </TabsList>
                <TabsContent value="treatments" className="space-y-4">
                  <p className="text-sm text-muted-foreground">{t.selectTreatments}</p>
                  {services.map((service) => (
                    <div key={service.category} className="space-y-2">
                      <h3 className="font-serif text-lg">{language === 'en' ? service.category : service.categoryAr}</h3>
                      {service.treatments.map((treatment) => {
                        const key = `${service.category}-${treatment.name}`;
                        const isSelected = selectedTreatments.includes(key);
                        return (
                          <div
                            key={treatment.name}
                            onClick={() => toggleTreatment(service.category, treatment.name)}
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover-elevate ${
                              isSelected ? 'bg-primary/10 border-2' : 'border'
                            }`}
                            style={{ borderColor: isSelected ? '#D4AF37' : '#ddd' }}
                            data-testid={`treatment-${service.category}-${treatment.name}`}
                          >
                            <div>
                              <div className="font-medium">{language === 'en' ? treatment.name : treatment.nameAr}</div>
                              <div className="text-sm text-muted-foreground">{treatment.duration} {t.minutes}</div>
                            </div>
                            <div style={{ color: '#D4AF37' }}>{t.aed} {treatment.price.toLocaleString()}</div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="addons" className="space-y-4">
                  {vipAddons.map((addon) => {
                    const Icon = addon.icon;
                    const isSelected = selectedAddons.includes(addon.name);
                    return (
                      <div
                        key={addon.name}
                        onClick={() => toggleAddon(addon.name)}
                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer hover-elevate ${
                          isSelected ? 'bg-primary/10 border-2' : 'border'
                        }`}
                        style={{ borderColor: isSelected ? '#D4AF37' : '#ddd' }}
                        data-testid={`addon-${addon.name}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" style={{ color: '#D4AF37' }} />
                          <span>{language === 'en' ? addon.name : addon.nameAr}</span>
                        </div>
                        <div style={{ color: '#D4AF37' }}>{t.aed} {addon.price.toLocaleString()}</div>
                      </div>
                    );
                  })}
                </TabsContent>
              </Tabs>
              {(selectedTreatments.length > 0 || selectedAddons.length > 0) && (
                <div className="mt-6 p-4 rounded-md" style={{ backgroundColor: '#F5F3EE', borderColor: '#D4AF37', borderWidth: '2px' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-serif text-lg">{t.totalTime}:</span>
                    <span style={{ color: '#D4AF37' }}>{totalTime} {t.minutes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-lg">{t.totalPrice}:</span>
                    <span className="text-xl font-bold" style={{ color: '#D4AF37' }}>{t.aed} {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hover-elevate active-elevate-2"
                style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                data-testid="button-stylists"
              >
                <Users className="mr-2 h-4 w-4" />
                {t.stylists}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl" style={{ color: '#D4AF37' }}>
                  {t.selectStylists}
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.name}
                    className="border rounded-md overflow-hidden hover-elevate transition-all cursor-pointer"
                    style={{ borderColor: '#D4AF37' }}
                    data-testid={`stylist-${stylist.name}`}
                  >
                    <img src={stylist.image} alt={stylist.name} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <h3 className="font-serif text-xl mb-1">{language === 'en' ? stylist.name : stylist.nameAr}</h3>
                      <p className="text-sm mb-2" style={{ color: '#D4AF37' }}>
                        {language === 'en' ? stylist.specialty : stylist.specialtyAr}
                      </p>
                      <p className="text-xs text-muted-foreground">{stylist.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className="hover-elevate active-elevate-2"
            style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
            data-testid="button-before-after"
          >
            <Eye className="mr-2 h-4 w-4" />
            {t.beforeAfter}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.category}
              className="group relative overflow-hidden rounded-md cursor-pointer"
              style={{
                height: index === 0 || index === 3 ? '600px' : '500px',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              data-testid={`card-opulent-service-${index}`}
            >
              <div className="absolute top-4 right-4 w-16 h-16 z-20" style={{ borderTop: '3px solid #D4AF37', borderRight: '3px solid #D4AF37' }} />

              <img
                src={service.image}
                alt={service.category}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                  filter: showBeforeAfter ? 'grayscale(50%)' : 'none',
                }}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300"
                style={{ opacity: hoveredCard === index ? 1 : 0.7 }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3
                  className="text-2xl font-serif mb-2 transition-all duration-300"
                  style={{
                    color: '#D4AF37',
                    transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                  }}
                  data-testid={`text-service-category-${index}`}
                >
                  {language === 'en' ? service.category : service.categoryAr}
                </h3>
                <p className="text-sm mb-4 opacity-90" data-testid={`text-service-price-${index}`}>
                  {language === 'en' ? service.priceLabel : service.priceLabelAr}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-300"
                  style={{
                    borderColor: '#D4AF37',
                    color: '#D4AF37',
                    opacity: hoveredCard === index ? 1 : 0,
                    transform: hoveredCard === index ? 'translateY(0)' : 'translateY(20px)',
                  }}
                  data-testid={`button-inquire-${index}`}
                >
                  {t.inquire}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-serif text-center mb-8" style={{ color: '#0A0A0A' }} data-testid="text-vip-addons-title">
            {t.vipAddons}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vipAddons.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <div
                  key={addon.name}
                  className="bg-white border rounded-md p-6 text-center hover-elevate transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  data-testid={`card-vip-addon-${index}`}
                >
                  <Icon className="h-10 w-10 mx-auto mb-4" style={{ color: '#D4AF37' }} />
                  <h4 className="font-medium mb-2" style={{ color: '#0A0A0A' }} data-testid={`text-addon-name-${index}`}>
                    {language === 'en' ? addon.name : addon.nameAr}
                  </h4>
                  <p className="text-sm" style={{ color: '#D4AF37' }} data-testid={`text-addon-price-${index}`}>
                    {t.aed} {addon.price.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="px-12 py-6 text-lg shadow-2xl hover-elevate active-elevate-2"
            style={{
              backgroundColor: '#D4AF37',
              color: '#0A0A0A',
            }}
            data-testid="button-schedule-consultation"
          >
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
