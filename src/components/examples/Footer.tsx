import { useState } from 'react';
import Footer from '../Footer';

export default function FooterExample() {
  const [language] = useState<'en' | 'ar'>('en');
  
  return <Footer language={language} />;
}
