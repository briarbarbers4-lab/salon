import { useState } from 'react';
import PrivateSuitesShowcase from '../PrivateSuitesShowcase';

export default function PrivateSuitesShowcaseExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <PrivateSuitesShowcase language={language} />;
}
