import { useState } from 'react';
import ContactSection from '../ContactSection';

export default function ContactSectionExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <ContactSection language={language} />;
}
