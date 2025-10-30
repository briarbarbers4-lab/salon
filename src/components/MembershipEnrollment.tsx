import { useState } from 'react';
import { Check, Star, Diamond, ChevronRight, Shield, Calendar, UserCheck, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import goldFoilBg from '@assets/generated_images/Gold_foil_texture_background_f245ea19.png';
import diamondSparkle from '@assets/generated_images/Diamond_sparkle_effect_05a04a69.png';
import platinumShimmer from '@assets/generated_images/Platinum_shimmer_texture_10745579.png';

interface MembershipEnrollmentProps {
  language: 'en' | 'ar';
}

interface MembershipTier {
  id: string;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  price: string;
  priceAr: string;
  cardBg: string;
  accentColor: string;
  benefits: { text: string; textAr: string }[];
  buttonText: string;
  buttonTextAr: string;
  buttonVariant: 'outline' | 'default';
}

const tiers: MembershipTier[] = [
  {
    id: 'gold',
    name: 'Gold Member',
    nameAr: 'عضو ذهبي',
    tagline: 'Foundation of Excellence',
    taglineAr: 'أساس التميز',
    price: 'AED 25,000/year',
    priceAr: 'درهم 25,000/سنة',
    cardBg: '#F5F3EE',
    accentColor: '#D4AF37',
    benefits: [
      { text: '15% discount on all services', textAr: 'خصم 15% على جميع الخدمات' },
      { text: 'Priority booking (7 days advance)', textAr: 'حجز أولوية (7 أيام مسبقًا)' },
      { text: 'Birthday month complimentary treatment', textAr: 'علاج مجاني في شهر الميلاد' },
      { text: 'Quarterly trend consultations', textAr: 'استشارات الموضة ربع السنوية' },
      { text: 'Members-only events access', textAr: 'الوصول إلى فعاليات الأعضاء فقط' },
      { text: 'Exclusive product launches', textAr: 'إطلاقات المنتجات الحصرية' },
      { text: 'Dedicated WhatsApp line', textAr: 'خط واتساب مخصص' },
    ],
    buttonText: 'Inquire',
    buttonTextAr: 'استفسر',
    buttonVariant: 'outline',
  },
  {
    id: 'platinum',
    name: 'Platinum Member',
    nameAr: 'عضو بلاتيني',
    tagline: 'Elevated Luxury',
    taglineAr: 'فخامة مرتفعة',
    price: 'AED 50,000/year',
    priceAr: 'درهم 50,000/سنة',
    cardBg: 'linear-gradient(135deg, #2C2C2C 0%, #434343 100%)',
    accentColor: '#E5E4E2',
    benefits: [
      { text: '25% discount on services', textAr: 'خصم 25% على الخدمات' },
      { text: 'Private suite booking priority', textAr: 'أولوية حجز الجناح الخاص' },
      { text: 'Monthly complimentary blowout', textAr: 'تصفيف شعر مجاني شهريًا' },
      { text: 'VIP concierge service', textAr: 'خدمة الكونسيرج VIP' },
      { text: 'Home visit service (2x/year)', textAr: 'خدمة الزيارة المنزلية (مرتين في السنة)' },
      { text: 'International salon partnerships', textAr: 'شراكات الصالونات الدولية' },
      { text: 'Red carpet preparation (discounted)', textAr: 'إعداد السجادة الحمراء (بخصم)' },
      { text: 'Gift for special occasions', textAr: 'هدية للمناسبات الخاصة' },
    ],
    buttonText: 'Apply Now',
    buttonTextAr: 'قدم الآن',
    buttonVariant: 'default',
  },
  {
    id: 'diamond',
    name: 'Diamond Legacy',
    nameAr: 'إرث الماس',
    tagline: 'Lifetime Distinction',
    taglineAr: 'تميز مدى الحياة',
    price: 'By Invitation Only',
    priceAr: 'بالدعوة فقط',
    cardBg: '#0A0A0A',
    accentColor: '#B9F2FF',
    benefits: [
      { text: '40% lifetime discount', textAr: 'خصم 40% مدى الحياة' },
      { text: 'Anytime booking (24/7)', textAr: 'حجز في أي وقت (24/7)' },
      { text: 'Unlimited suite access', textAr: 'وصول غير محدود للأجنحة' },
      { text: 'Personal style team assigned', textAr: 'فريق أسلوب شخصي مخصص' },
      { text: 'Unlimited home visits', textAr: 'زيارات منزلية غير محدودة' },
      { text: 'Personal shopper for products', textAr: 'متسوق شخصي للمنتجات' },
      { text: 'Global salon network access', textAr: 'الوصول إلى شبكة الصالونات العالمية' },
      { text: 'Annual luxury retreat invitation', textAr: 'دعوة خلوة فاخرة سنوية' },
      { text: 'Legacy membership (inheritable)', textAr: 'عضوية موروثة (قابلة للتوريث)' },
    ],
    buttonText: 'Private Consultation Required',
    buttonTextAr: 'استشارة خاصة مطلوبة',
    buttonVariant: 'outline',
  },
];

const comparisonFeatures = [
  { name: 'Service Discount', nameAr: 'خصم الخدمة', gold: '15%', platinum: '25%', diamond: '40%' },
  { name: 'Advance Booking', nameAr: 'الحجز المسبق', gold: '7 days', platinum: '14 days', diamond: 'Anytime' },
  { name: 'Complimentary Treatments', nameAr: 'العلاجات المجانية', gold: '1/year', platinum: '12/year', diamond: 'Unlimited' },
  { name: 'Suite Access', nameAr: 'الوصول إلى الجناح', gold: 'Standard', platinum: 'Priority', diamond: 'Unlimited' },
  { name: 'Home Visits', nameAr: 'الزيارات المنزلية', gold: '—', platinum: '2/year', diamond: 'Unlimited' },
  { name: 'International Network', nameAr: 'الشبكة الدولية', gold: '—', platinum: 'Yes', diamond: 'Global' },
  { name: 'Personal Shopper', nameAr: 'المتسوق الشخصي', gold: '—', platinum: '—', diamond: 'Yes' },
  { name: 'Retreat Invitations', nameAr: 'دعوات الخلوة', gold: '—', platinum: '—', diamond: 'Annual' },
  { name: 'Membership Transfer', nameAr: 'نقل العضوية', gold: '—', platinum: '—', diamond: 'Inheritable' },
];

const enrollmentSteps = [
  {
    number: 1,
    title: 'Submit Application',
    titleAr: 'تقديم الطلب',
    description: 'Complete our confidential membership form',
    descriptionAr: 'أكمل نموذج العضوية السري الخاص بنا',
    icon: UserCheck,
  },
  {
    number: 2,
    title: 'Personal Interview',
    titleAr: 'مقابلة شخصية',
    description: 'By appointment at your preferred location',
    descriptionAr: 'بالموعد في موقعك المفضل',
    icon: Calendar,
  },
  {
    number: 3,
    title: 'Reference Verification',
    titleAr: 'التحقق من المراجع',
    description: 'Discretion guaranteed throughout process',
    descriptionAr: 'التقدير مضمون طوال العملية',
    icon: Shield,
  },
  {
    number: 4,
    title: 'Welcome Package',
    titleAr: 'حزمة الترحيب',
    description: 'Delivered to your residence',
    descriptionAr: 'يتم تسليمها إلى مقر إقامتك',
    icon: Gift,
  },
];

const memberTestimonials = [
  {
    quote: 'As a film producer, discretion is paramount. The Diamond Legacy membership provides unmatched privacy and service.',
    quoteAr: 'كمنتج أفلام، التقدير أمر بالغ الأهمية. عضوية إرث الماس توفر خصوصية وخدمة لا مثيل لها.',
    profession: 'Film Industry Professional',
    professionAr: 'محترف صناعة الأفلام',
  },
  {
    quote: 'Worth every dirham. The Platinum membership has transformed my beauty routine into a luxury experience.',
    quoteAr: 'يستحق كل درهم. عضوية البلاتين حولت روتين الجمال الخاص بي إلى تجربة فاخرة.',
    profession: 'Fashion Entrepreneur',
    professionAr: 'رائد أعمال الموضة',
  },
  {
    quote: 'The Gold membership is the perfect introduction to world-class luxury. Exceptional value and impeccable service.',
    quoteAr: 'عضوية الذهب هي المقدمة المثالية للرفاهية ذات المستوى العالمي. قيمة استثنائية وخدمة لا تشوبها شائبة.',
    profession: 'Media Executive',
    professionAr: 'تنفيذي إعلامي',
  },
];

export default function MembershipEnrollment({ language }: MembershipEnrollmentProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedTier, setSelectedTier] = useState('gold');
  const isRTL = language === 'ar';

  const content = {
    en: {
      heading: 'The Inner Circle',
      headingAr: 'الدائرة الداخلية',
      subheading: 'Invitation-Only Membership Program',
      subheadingAr: 'برنامج العضوية بالدعوة فقط',
      annual: 'Annual Investment',
      annualAr: 'الاستثمار السنوي',
      comparison: 'Membership Comparison',
      comparisonAr: 'مقارنة العضوية',
      features: 'Features',
      featuresAr: 'الميزات',
      enrollment: 'Enrollment Process',
      enrollmentAr: 'عملية التسجيل',
      testimonials: 'Member Testimonials',
      testimonialsAr: 'شهادات الأعضاء',
      applicationForm: 'Membership Application',
      applicationFormAr: 'طلب العضوية',
      fullName: 'Full Name (English)',
      fullNameAr: 'الاسم الكامل (بالعربية)',
      email: 'Email Address',
      phone: 'Phone Number',
      whatsapp: 'WhatsApp Number',
      preferredLanguage: 'Preferred Communication Language',
      beautyRoutine: 'Current Beauty Routine',
      specialRequirements: 'Special Requirements',
      referralSource: 'How did you hear about us? (Optional)',
      preferredTier: 'Preferred Membership Tier',
      privacyStatement: 'Your privacy is our priority. All information will be kept strictly confidential.',
      submit: 'Submit Application',
      cancel: 'Cancel',
    },
    ar: {
      heading: 'الدائرة الداخلية',
      headingAr: 'The Inner Circle',
      subheading: 'برنامج العضوية بالدعوة فقط',
      subheadingAr: 'Invitation-Only Membership Program',
      annual: 'الاستثمار السنوي',
      annualAr: 'Annual Investment',
      comparison: 'مقارنة العضوية',
      comparisonAr: 'Membership Comparison',
      features: 'الميزات',
      featuresAr: 'Features',
      enrollment: 'عملية التسجيل',
      enrollmentAr: 'Enrollment Process',
      testimonials: 'شهادات الأعضاء',
      testimonialsAr: 'Member Testimonials',
      applicationForm: 'طلب العضوية',
      applicationFormAr: 'Membership Application',
      fullName: 'الاسم الكامل (بالعربية)',
      fullNameAr: 'Full Name (English)',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      whatsapp: 'رقم واتساب',
      preferredLanguage: 'لغة الاتصال المفضلة',
      beautyRoutine: 'روتين الجمال الحالي',
      specialRequirements: 'المتطلبات الخاصة',
      referralSource: 'كيف سمعت عنا؟ (اختياري)',
      preferredTier: 'مستوى العضوية المفضل',
      privacyStatement: 'خصوصيتك هي أولويتنا. سيتم الاحتفاظ بجميع المعلومات بسرية تامة.',
      submit: 'إرسال الطلب',
      cancel: 'إلغاء',
    },
  };

  const t = content[language];

  return (
    <section
      className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#F5F3EE' }}
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="section-membership"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${goldFoilBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-wide"
            style={{ 
              color: '#0A0A0A',
              textShadow: '2px 2px 4px rgba(212, 175, 55, 0.3)'
            }}
            data-testid="text-inner-circle"
          >
            {language === 'en' ? t.heading : t.headingAr}
          </h2>
          <p
            className="text-3xl font-arabic"
            style={{ color: '#0A0A0A' }}
            data-testid="text-inner-circle-secondary"
          >
            {language === 'en' ? t.headingAr : t.heading}
          </p>
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-subheading"
          >
            {language === 'en' ? t.subheading : t.subheadingAr}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {tiers.map((tier, index) => (
            <Card
              key={tier.id}
              className="relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0"
              style={{
                background: tier.cardBg,
                backgroundImage: tier.id === 'diamond' ? `url(${diamondSparkle})` : tier.id === 'platinum' ? `url(${platinumShimmer})` : 'none',
                backgroundSize: 'cover',
                backgroundBlendMode: tier.id === 'diamond' || tier.id === 'platinum' ? 'overlay' : 'normal',
              }}
              data-testid={`card-tier-${tier.id}`}
            >
              <div className="p-8 space-y-6 min-h-[600px] flex flex-col">
                <div className="space-y-2">
                  <h3
                    className="text-3xl font-serif font-semibold"
                    style={{ color: tier.id === 'gold' ? '#0A0A0A' : '#F5F3EE' }}
                    data-testid={`text-tier-name-${tier.id}`}
                  >
                    {language === 'en' ? tier.name : tier.nameAr}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: tier.accentColor }}
                    data-testid={`text-tier-tagline-${tier.id}`}
                  >
                    {language === 'en' ? tier.tagline : tier.taglineAr}
                  </p>
                </div>

                <div className="py-4 border-t border-b" style={{ borderColor: tier.accentColor + '40' }}>
                  <div className="text-xs" style={{ color: tier.id === 'gold' ? '#666' : '#CCC' }}>
                    {language === 'en' ? t.annual : t.annualAr}
                  </div>
                  <div
                    className="text-2xl font-serif mt-1"
                    style={{ color: tier.accentColor }}
                    data-testid={`text-tier-price-${tier.id}`}
                  >
                    {language === 'en' ? tier.price : tier.priceAr}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2" data-testid={`benefit-${tier.id}-${idx}`}>
                      <Check
                        className="h-5 w-5 flex-shrink-0 mt-0.5"
                        style={{ color: tier.accentColor }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: tier.id === 'gold' ? '#0A0A0A' : '#F5F3EE' }}
                      >
                        {language === 'en' ? benefit.text : benefit.textAr}
                      </span>
                    </div>
                  ))}
                </div>

                <Dialog open={showApplicationForm && selectedTier === tier.id} onOpenChange={(open) => {
                  if (!open) setShowApplicationForm(false);
                }}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full hover-elevate active-elevate-2"
                      variant={tier.buttonVariant}
                      style={tier.buttonVariant === 'outline' ? {
                        borderColor: tier.accentColor,
                        color: tier.accentColor,
                        backgroundColor: 'transparent'
                      } : {
                        backgroundColor: tier.accentColor,
                        color: tier.id === 'gold' ? '#0A0A0A' : '#0A0A0A',
                      }}
                      onClick={() => {
                        setSelectedTier(tier.id);
                        setShowApplicationForm(true);
                      }}
                      data-testid={`button-${tier.id}-cta`}
                    >
                      {language === 'en' ? tier.buttonText : tier.buttonTextAr}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-serif" style={{ color: '#D4AF37' }}>
                        {language === 'en' ? t.applicationForm : t.applicationFormAr}
                      </DialogTitle>
                    </DialogHeader>
                    <form className="space-y-6 mt-6" data-testid="form-membership-application">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullNameEn">{t.fullName}</Label>
                          <Input id="fullNameEn" placeholder="John Doe" data-testid="input-name-en" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fullNameAr">{t.fullNameAr}</Label>
                          <Input id="fullNameAr" placeholder="جون دو" className="font-arabic" data-testid="input-name-ar" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input id="email" type="email" placeholder="contact@example.com" data-testid="input-email" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.phone}</Label>
                          <Input id="phone" type="tel" placeholder="+971 50 123 4567" data-testid="input-phone" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp">{t.whatsapp}</Label>
                          <Input id="whatsapp" type="tel" placeholder="+971 50 123 4567" data-testid="input-whatsapp" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{t.preferredLanguage}</Label>
                        <RadioGroup defaultValue="en" data-testid="radio-language">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="en" id="lang-en" />
                            <Label htmlFor="lang-en">English</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ar" id="lang-ar" />
                            <Label htmlFor="lang-ar">العربية</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="lang-both" />
                            <Label htmlFor="lang-both">Both / كلاهما</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="routine">{t.beautyRoutine}</Label>
                        <Textarea id="routine" placeholder="Describe your current beauty and wellness routine..." data-testid="textarea-routine" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requirements">{t.specialRequirements}</Label>
                        <Textarea id="requirements" placeholder="Any special requirements or preferences..." data-testid="textarea-requirements" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="referral">{t.referralSource}</Label>
                        <Input id="referral" placeholder="Friend, social media, event, etc." data-testid="input-referral" />
                      </div>

                      <div className="space-y-2">
                        <Label>{t.preferredTier}</Label>
                        <RadioGroup value={selectedTier} onValueChange={setSelectedTier} data-testid="radio-tier">
                          {tiers.map((tier) => (
                            <div key={tier.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={tier.id} id={`tier-${tier.id}`} />
                              <Label htmlFor={`tier-${tier.id}`}>
                                {language === 'en' ? tier.name : tier.nameAr} - {language === 'en' ? tier.price : tier.priceAr}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="p-4 rounded-md" style={{ backgroundColor: '#F5F3EE', border: '1px solid #D4AF37' }}>
                        <p className="text-sm text-center" style={{ color: '#0A0A0A' }}>
                          {t.privacyStatement}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 hover-elevate active-elevate-2"
                          onClick={() => setShowApplicationForm(false)}
                          data-testid="button-cancel-application"
                        >
                          {t.cancel}
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-primary text-primary-foreground hover-elevate active-elevate-2"
                          data-testid="button-submit-application"
                        >
                          {t.submit}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-24">
          <h3
            className="text-4xl font-serif text-center mb-12"
            style={{ color: '#0A0A0A' }}
            data-testid="text-comparison-heading"
          >
            {language === 'en' ? t.comparison : t.comparisonAr}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#0A0A0A' }}>
                  <th className="p-4 text-left" style={{ color: '#F5F3EE' }}>
                    {language === 'en' ? t.features : t.featuresAr}
                  </th>
                  {tiers.map((tier) => (
                    <th key={tier.id} className="p-4 text-center" style={{ color: tier.accentColor }}>
                      {language === 'en' ? tier.name : tier.nameAr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr
                    key={idx}
                    className="border-b hover-elevate transition-all"
                    style={{ borderColor: '#D4AF37' + '20' }}
                    data-testid={`comparison-row-${idx}`}
                  >
                    <td className="p-4 font-medium" style={{ color: '#0A0A0A' }}>
                      {language === 'en' ? feature.name : feature.nameAr}
                    </td>
                    <td className="p-4 text-center" style={{ color: '#0A0A0A' }}>
                      {feature.gold === '—' ? '—' : <span className="inline-flex items-center gap-2">
                        <Check className="h-4 w-4" style={{ color: '#D4AF37' }} />
                        {feature.gold}
                      </span>}
                    </td>
                    <td className="p-4 text-center" style={{ color: '#0A0A0A' }}>
                      {feature.platinum === '—' ? '—' : <span className="inline-flex items-center gap-2">
                        <Star className="h-4 w-4" style={{ color: '#E5E4E2' }} />
                        {feature.platinum}
                      </span>}
                    </td>
                    <td className="p-4 text-center" style={{ color: '#0A0A0A' }}>
                      {feature.diamond === '—' ? '—' : <span className="inline-flex items-center gap-2">
                        <Diamond className="h-4 w-4" style={{ color: '#B9F2FF' }} />
                        {feature.diamond}
                      </span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-24">
          <h3
            className="text-4xl font-serif text-center mb-12"
            style={{ color: '#0A0A0A' }}
            data-testid="text-enrollment-heading"
          >
            {language === 'en' ? t.enrollment : t.enrollmentAr}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {enrollmentSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative text-center space-y-4 p-6 rounded-md hover-elevate transition-all"
                  style={{ backgroundColor: '#FFFFFF', border: '2px solid #D4AF37' }}
                  data-testid={`enrollment-step-${idx}`}
                >
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-serif"
                    style={{ backgroundColor: '#D4AF37', color: '#0A0A0A' }}
                  >
                    {step.number}
                  </div>
                  <Icon className="h-10 w-10 mx-auto" style={{ color: '#D4AF37' }} />
                  <h4 className="text-xl font-serif" style={{ color: '#0A0A0A' }}>
                    {language === 'en' ? step.title : step.titleAr}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? step.description : step.descriptionAr}
                  </p>
                  {idx < enrollmentSteps.length - 1 && (
                    <ChevronRight
                      className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2"
                      style={{ color: '#D4AF37' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3
            className="text-4xl font-serif text-center mb-12"
            style={{ color: '#0A0A0A' }}
            data-testid="text-testimonials-heading"
          >
            {language === 'en' ? t.testimonials : t.testimonialsAr}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {memberTestimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className="p-8 hover-elevate transition-all"
                style={{ backgroundColor: '#FFFFFF', border: '2px solid #D4AF37' }}
                data-testid={`testimonial-${idx}`}
              >
                <div className="text-5xl mb-4" style={{ color: '#D4AF37' }}>"</div>
                <p className="text-foreground mb-6 italic">
                  {language === 'en' ? testimonial.quote : testimonial.quoteAr}
                </p>
                <div className="text-sm font-semibold" style={{ color: '#D4AF37' }}>
                  — {language === 'en' ? testimonial.profession : testimonial.professionAr}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
