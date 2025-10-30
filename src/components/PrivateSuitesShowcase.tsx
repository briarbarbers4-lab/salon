import { useState } from 'react';
import { Check, DoorOpen, User, Droplet, Volume2, Shield, Coffee, ChevronLeft, ChevronRight, Calendar, Clock, MessageCircle, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';

import platinumImg from '@assets/generated_images/Platinum_suite_interior_3a16313a.png';
import diamondImg from '@assets/generated_images/Diamond_penthouse_suite_e1671693.png';
import bridalImg from '@assets/generated_images/Bridal_palace_suite_c6626de5.png';
import floorPlanImg from '@assets/generated_images/Suite_floor_plan_fcae3e10.png';
import geometricPattern from '@assets/generated_images/Gold_geometric_pattern_7232684b.png';
import ledMirrorImg from '@assets/generated_images/LED_mirror_vanity_detail_fcaaa63e.png';
import massageChairImg from '@assets/generated_images/Massage_chair_detail_6cb66197.png';
import entranceImg from '@assets/generated_images/Private_entrance_hallway_450cee9f.png';

interface PrivateSuitesShowcaseProps {
  language: 'en' | 'ar';
}

interface Suite {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  mainImage: string;
  gallery: string[];
  sqft: number;
  capacity: number;
  amenities: {
    icon: any;
    name: string;
    nameAr: string;
  }[];
  hourlyRate: number;
  halfDayRate: number;
  fullDayRate: number;
  weeklyRate: number;
}

const amenityIconsBase = [
  { icon: DoorOpen, name: 'Private Entrance', nameAr: 'مدخل خاص' },
  { icon: User, name: 'Personal Butler Service', nameAr: 'خدمة الخادم الشخصي' },
  { icon: Droplet, name: 'Climate Control', nameAr: 'التحكم في المناخ' },
  { icon: Volume2, name: 'Premium Sound System', nameAr: 'نظام صوتي متميز' },
  { icon: Shield, name: 'Security & Discretion', nameAr: 'الأمن والسرية' },
  { icon: Coffee, name: 'Refreshment Station', nameAr: 'محطة المرطبات' },
];

const suites: Suite[] = [
  {
    id: 'platinum',
    name: 'Platinum Suites',
    nameAr: 'أجنحة البلاتين',
    description: 'Individual luxury rooms with complete privacy and premium amenities',
    descriptionAr: 'غرف فاخرة فردية مع خصوصية كاملة ووسائل راحة متميزة',
    mainImage: platinumImg,
    gallery: [platinumImg, ledMirrorImg, massageChairImg, entranceImg],
    sqft: 450,
    capacity: 2,
    amenities: amenityIconsBase,
    hourlyRate: 800,
    halfDayRate: 2800,
    fullDayRate: 4500,
    weeklyRate: 25000,
  },
  {
    id: 'diamond',
    name: 'Diamond Penthouse',
    nameAr: 'بنتهاوس الماس',
    description: 'Entire floor dedicated to VIP clients with unparalleled luxury',
    descriptionAr: 'طابق كامل مخصص لعملاء VIP مع فخامة لا مثيل لها',
    mainImage: diamondImg,
    gallery: [diamondImg, platinumImg, ledMirrorImg, massageChairImg],
    sqft: 2000,
    capacity: 6,
    amenities: amenityIconsBase,
    hourlyRate: 2500,
    halfDayRate: 9000,
    fullDayRate: 15000,
    weeklyRate: 85000,
  },
  {
    id: 'bridal',
    name: 'Bridal Palace',
    nameAr: 'قصر العروس',
    description: 'Dedicated wedding preparation suite with romantic ambiance',
    descriptionAr: 'جناح إعداد الزفاف المخصص مع أجواء رومانسية',
    mainImage: bridalImg,
    gallery: [bridalImg, ledMirrorImg, entranceImg, massageChairImg],
    sqft: 800,
    capacity: 4,
    amenities: amenityIconsBase,
    hourlyRate: 1500,
    halfDayRate: 5500,
    fullDayRate: 9500,
    weeklyRate: 55000,
  },
];

const testimonials = [
  {
    quote: 'An unparalleled experience. The discretion and attention to detail made me feel like royalty.',
    quoteAr: 'تجربة لا مثيل لها. جعلني التقدير والاهتمام بالتفاصيل أشعر كأنني من العائلة المالكة.',
    industry: 'Film Producer',
    industryAr: 'منتج أفلام',
  },
  {
    quote: 'The Diamond Penthouse is my sanctuary. Nowhere else offers this level of luxury and privacy.',
    quoteAr: 'بنتهاوس الماس هو ملاذي. لا يوجد مكان آخر يقدم هذا المستوى من الفخامة والخصوصية.',
    industry: 'Fashion Icon',
    industryAr: 'أيقونة الموضة',
  },
  {
    quote: 'For our family, only the best will do. Elite Sanctuary exceeds every expectation.',
    quoteAr: 'لعائلتنا، فقط الأفضل سيفعل. إليت سانكتشواري يتجاوز كل التوقعات.',
    industry: 'Royal Family Member',
    industryAr: 'عضو العائلة المالكة',
  },
];

export default function PrivateSuitesShowcase({ language }: PrivateSuitesShowcaseProps) {
  const [selectedSuite, setSelectedSuite] = useState<Suite>(suites[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<'hourly' | 'halfDay' | 'fullDay' | 'weekly'>('hourly');
  const [comparisonSuites, setComparisonSuites] = useState<string[]>([]);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'Your Private Sanctuary',
      titleAr: 'ملاذك الخاص',
      virtualTour: '360° Virtual Tour',
      gallery: 'Photo Gallery',
      specifications: 'Suite Specifications',
      sqft: 'Square Footage',
      capacity: 'Capacity',
      guests: 'guests',
      amenities: 'Premium Amenities',
      floorPlan: 'Interactive Floor Plan',
      booking: 'Booking Information',
      availability: 'Check Availability',
      duration: 'Select Duration',
      hourly: '2+ Hours',
      halfDay: 'Half Day (4 hrs)',
      fullDay: 'Full Day (8 hrs)',
      weekly: 'Weekly Package',
      pricing: 'Investment in Excellence',
      aed: 'AED',
      perHour: '/hour',
      reserve: 'Reserve Suite',
      whatsapp: 'WhatsApp VIP Line',
      compare: 'Compare Suites',
      comparing: 'Comparing',
      testimonials: 'Distinguished Clientele',
      memberDiscount: 'Member Discount Available',
      minHours: 'Minimum 2 hours',
      hotspots: {
        styling: 'Premium Styling Stations',
        massage: 'Massage & Relaxation',
        mirror: 'LED Smart Mirrors',
        products: 'Luxury Product Display',
        privacy: 'Enhanced Privacy Features',
      }
    },
    ar: {
      title: 'ملاذك الخاص',
      titleAr: 'Your Private Sanctuary',
      virtualTour: 'جولة افتراضية 360°',
      gallery: 'معرض الصور',
      specifications: 'مواصفات الجناح',
      sqft: 'المساحة بالقدم المربع',
      capacity: 'السعة',
      guests: 'ضيوف',
      amenities: 'وسائل الراحة المتميزة',
      floorPlan: 'مخطط الطابق التفاعلي',
      booking: 'معلومات الحجز',
      availability: 'تحقق من التوفر',
      duration: 'اختر المدة',
      hourly: '2+ ساعات',
      halfDay: 'نصف يوم (4 ساعات)',
      fullDay: 'يوم كامل (8 ساعات)',
      weekly: 'باقة أسبوعية',
      pricing: 'استثمار في التميز',
      aed: 'درهم',
      perHour: '/ساعة',
      reserve: 'احجز الجناح',
      whatsapp: 'خط واتساب VIP',
      compare: 'مقارنة الأجنحة',
      comparing: 'المقارنة',
      testimonials: 'العملاء المتميزون',
      memberDiscount: 'خصم الأعضاء متاح',
      minHours: 'الحد الأدنى ساعتان',
      hotspots: {
        styling: 'محطات التصفيف المتميزة',
        massage: 'التدليك والاسترخاء',
        mirror: 'مرايا LED الذكية',
        products: 'عرض المنتجات الفاخرة',
        privacy: 'ميزات الخصوصية المحسنة',
      }
    }
  };

  const t = content[language];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedSuite.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedSuite.gallery.length) % selectedSuite.gallery.length);
  };

  const toggleComparison = (suiteId: string) => {
    setComparisonSuites(prev =>
      prev.includes(suiteId) ? prev.filter(id => id !== suiteId) : [...prev, suiteId].slice(0, 3)
    );
  };

  const getCurrentPrice = (suite: Suite) => {
    switch (selectedDuration) {
      case 'hourly': return suite.hourlyRate;
      case 'halfDay': return suite.halfDayRate;
      case 'fullDay': return suite.fullDayRate;
      case 'weekly': return suite.weeklyRate;
    }
  };

  return (
    <section
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="section-suites-showcase"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${geometricPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide"
            style={{ color: '#D4AF37' }}
            data-testid="text-sanctuary-title"
          >
            {language === 'en' ? t.title : t.titleAr}
          </h2>
          <p
            className="text-2xl font-arabic"
            style={{ color: '#D4AF37' }}
            data-testid="text-sanctuary-title-secondary"
          >
            {language === 'en' ? t.titleAr : t.title}
          </p>
        </div>

        <Tabs defaultValue="platinum" className="space-y-12" onValueChange={(value) => {
          const suite = suites.find(s => s.id === value);
          if (suite) {
            setSelectedSuite(suite);
            setCurrentImageIndex(0);
          }
        }}>
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-background/20">
            {suites.map((suite) => (
              <TabsTrigger
                key={suite.id}
                value={suite.id}
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary"
                style={{ color: '#F5F3EE' }}
                data-testid={`tab-${suite.id}`}
              >
                {language === 'en' ? suite.name : suite.nameAr}
              </TabsTrigger>
            ))}
          </TabsList>

          {suites.map((suite) => (
            <TabsContent key={suite.id} value={suite.id} className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="relative h-96 rounded-md overflow-hidden group">
                    <img
                      src={suite.gallery[currentImageIndex]}
                      alt={suite.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-suite-main-${suite.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover-elevate bg-background/20 backdrop-blur-sm"
                      style={{ color: '#D4AF37' }}
                      data-testid="button-prev-image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover-elevate bg-background/20 backdrop-blur-sm"
                      style={{ color: '#D4AF37' }}
                      data-testid="button-next-image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <Dialog open={showVirtualTour} onOpenChange={setShowVirtualTour}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground hover-elevate active-elevate-2"
                            data-testid="button-virtual-tour"
                          >
                            <Maximize2 className="h-4 w-4 mr-2" />
                            {t.virtualTour}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl" style={{ color: '#D4AF37' }}>
                              {t.virtualTour} - {language === 'en' ? suite.name : suite.nameAr}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="relative h-[500px]">
                            <img
                              src={suite.mainImage}
                              alt="360 view"
                              className="w-full h-full object-cover rounded-md cursor-move"
                              draggable="true"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm bg-black/60 px-4 py-2 rounded-full" style={{ color: '#D4AF37' }}>
                              Click and drag to explore
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {suite.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex ? 'w-8' : 'w-2'
                          }`}
                          style={{ backgroundColor: index === currentImageIndex ? '#D4AF37' : '#F5F3EE' }}
                          data-testid={`button-gallery-dot-${index}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {suite.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-20 rounded-md overflow-hidden hover-elevate transition-all ${
                          index === currentImageIndex ? 'ring-2 ring-primary' : ''
                        }`}
                        data-testid={`button-gallery-thumb-${index}`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-serif mb-2" style={{ color: '#F5F3EE' }} data-testid={`text-suite-name-${suite.id}`}>
                      {language === 'en' ? suite.name : suite.nameAr}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-suite-description-${suite.id}`}>
                      {language === 'en' ? suite.description : suite.descriptionAr}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-card border-card-border p-4">
                      <div className="text-sm text-muted-foreground mb-1">{t.sqft}</div>
                      <div className="text-2xl font-serif" style={{ color: '#D4AF37' }} data-testid={`text-sqft-${suite.id}`}>
                        {suite.sqft} sq ft
                      </div>
                    </Card>
                    <Card className="bg-card border-card-border p-4">
                      <div className="text-sm text-muted-foreground mb-1">{t.capacity}</div>
                      <div className="text-2xl font-serif" style={{ color: '#D4AF37' }} data-testid={`text-capacity-${suite.id}`}>
                        {suite.capacity} {t.guests}
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h4 className="text-lg font-serif mb-4" style={{ color: '#F5F3EE' }}>{t.amenities}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {suite.amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-center gap-2" data-testid={`amenity-${index}`}>
                            <Check className="h-4 w-4 flex-shrink-0" style={{ color: '#D4AF37' }} />
                            <span className="text-sm text-foreground">{language === 'en' ? amenity.name : amenity.nameAr}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowFloorPlan(!showFloorPlan)}
                    variant="outline"
                    className="w-full hover-elevate active-elevate-2"
                    style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                    data-testid="button-floor-plan"
                  >
                    {t.floorPlan}
                  </Button>

                  {showFloorPlan && (
                    <div className="relative">
                      <img src={floorPlanImg} alt="Floor plan" className="w-full rounded-md" />
                      <div
                        className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full cursor-pointer hover-elevate transition-all"
                        style={{ backgroundColor: '#D4AF37' }}
                        onMouseEnter={() => setHoveredHotspot('styling')}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        data-testid="hotspot-styling"
                      >
                        {hoveredHotspot === 'styling' && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background px-3 py-2 rounded-md whitespace-nowrap text-sm" style={{ color: '#D4AF37' }}>
                            {t.hotspots.styling}
                          </div>
                        )}
                      </div>
                      <div
                        className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full cursor-pointer hover-elevate transition-all"
                        style={{ backgroundColor: '#D4AF37' }}
                        onMouseEnter={() => setHoveredHotspot('massage')}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        data-testid="hotspot-massage"
                      >
                        {hoveredHotspot === 'massage' && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background px-3 py-2 rounded-md whitespace-nowrap text-sm" style={{ color: '#D4AF37' }}>
                            {t.hotspots.massage}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h4 className="text-2xl font-serif" style={{ color: '#F5F3EE' }}>{t.booking}</h4>
                  
                  <div>
                    <label className="text-sm text-muted-foreground mb-3 block">{t.duration}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(['hourly', 'halfDay', 'fullDay', 'weekly'] as const).map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setSelectedDuration(duration)}
                          className={`p-3 rounded-md border transition-all hover-elevate ${
                            selectedDuration === duration ? 'border-primary bg-primary/10' : 'border-card-border'
                          }`}
                          data-testid={`button-duration-${duration}`}
                        >
                          <div className="text-sm" style={{ color: selectedDuration === duration ? '#D4AF37' : '#F5F3EE' }}>
                            {t[duration]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 hover-elevate active-elevate-2"
                      style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                      data-testid="button-availability"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {t.availability}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 hover-elevate active-elevate-2"
                      style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                      onClick={() => toggleComparison(suite.id)}
                      data-testid="button-compare"
                    >
                      {comparisonSuites.includes(suite.id) ? `✓ ${t.comparing}` : t.compare}
                    </Button>
                  </div>
                </div>

                <Card className="bg-card border-card-border p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-2">{t.pricing}</div>
                    <div className="text-4xl font-serif" style={{ color: '#D4AF37' }} data-testid={`text-price-${suite.id}`}>
                      {t.aed} {getCurrentPrice(suite).toLocaleString()}
                    </div>
                    {selectedDuration === 'hourly' && (
                      <div className="text-sm text-muted-foreground mt-1">{t.perHour}</div>
                    )}
                  </div>
                  <div className="text-xs text-center" style={{ color: '#D4AF37' }}>
                    {t.memberDiscount}
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover-elevate active-elevate-2"
                    data-testid={`button-reserve-${suite.id}`}
                  >
                    {t.reserve}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover-elevate active-elevate-2"
                    style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
                    data-testid={`button-whatsapp-${suite.id}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t.whatsapp}
                  </Button>
                  {selectedDuration === 'hourly' && (
                    <div className="text-xs text-center text-muted-foreground">{t.minHours}</div>
                  )}
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {comparisonSuites.length > 0 && (
          <div className="mt-16 p-8 rounded-md" style={{ backgroundColor: '#F5F3EE' }}>
            <h3 className="text-2xl font-serif mb-8 text-center" style={{ color: '#0A0A0A' }}>
              {t.compare}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {comparisonSuites.map((suiteId) => {
                const suite = suites.find(s => s.id === suiteId)!;
                return (
                  <Card key={suiteId} className="bg-background p-6">
                    <h4 className="font-serif text-xl mb-4" style={{ color: '#D4AF37' }}>
                      {language === 'en' ? suite.name : suite.nameAr}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.sqft}</span>
                        <span className="text-foreground">{suite.sqft} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.capacity}</span>
                        <span className="text-foreground">{suite.capacity} {t.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.hourly}</span>
                        <span style={{ color: '#D4AF37' }}>{t.aed} {suite.hourlyRate}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-24">
          <h3 className="text-3xl font-serif text-center mb-12" style={{ color: '#D4AF37' }}>
            {t.testimonials}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-card-border p-8">
                <div className="text-4xl mb-4" style={{ color: '#D4AF37' }}>"</div>
                <p className="text-foreground mb-6 italic" data-testid={`testimonial-quote-${index}`}>
                  {language === 'en' ? testimonial.quote : testimonial.quoteAr}
                </p>
                <div className="text-sm" style={{ color: '#D4AF37' }} data-testid={`testimonial-industry-${index}`}>
                  — {language === 'en' ? testimonial.industry : testimonial.industryAr}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
