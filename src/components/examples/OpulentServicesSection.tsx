import { useState } from 'react';
import OpulentServicesSection from '../OpulentServicesSection';

export default function OpulentServicesSectionExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <OpulentServicesSection language={language} />;
}
