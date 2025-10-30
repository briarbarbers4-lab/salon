import { useState } from 'react';
import ServicesSection from '../ServicesSection';

export default function ServicesSectionExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <ServicesSection language={language} />;
}
