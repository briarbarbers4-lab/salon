import { useState } from 'react';
import PrivateSuitesSection from '../PrivateSuitesSection';

export default function PrivateSuitesSectionExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <PrivateSuitesSection language={language} />;
}
