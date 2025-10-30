import { useState } from 'react';
import LuxuryNavigation from '@/components/LuxuryNavigation';
import HeroSection from '@/components/HeroSection';
import OpulentServicesSection from '@/components/OpulentServicesSection';
import PrivateSuitesShowcase from '@/components/PrivateSuitesShowcase';
import MembershipEnrollment from '@/components/MembershipEnrollment';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen bg-background">
      <LuxuryNavigation language={language} onLanguageToggle={toggleLanguage} />
      <HeroSection language={language} />
      <OpulentServicesSection language={language} />
      <PrivateSuitesShowcase language={language} />
      <MembershipEnrollment language={language} />
      <ContactSection language={language} />
      <Footer language={language} />
    </div>
  );
}
