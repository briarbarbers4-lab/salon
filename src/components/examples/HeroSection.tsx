import { useState } from 'react';
import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <HeroSection language={language} />;
}
