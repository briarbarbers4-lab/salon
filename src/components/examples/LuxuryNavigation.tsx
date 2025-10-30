import { useState } from 'react';
import LuxuryNavigation from '../LuxuryNavigation';

export default function LuxuryNavigationExample() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <LuxuryNavigation 
      language={language} 
      onLanguageToggle={() => setLanguage(language === 'en' ? 'ar' : 'en')} 
    />
  );
}
