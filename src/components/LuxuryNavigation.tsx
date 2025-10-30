import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/generated_images/Luxury_salon_logo_design_16f8bd63.png';

interface LuxuryNavigationProps {
  language: 'en' | 'ar';
  onLanguageToggle: () => void;
}

export default function LuxuryNavigation({ language, onLanguageToggle }: LuxuryNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = language === 'en' 
    ? ['HOME', 'SERVICES', 'PRIVATE SUITES', 'GALLERY', 'MEMBERSHIP', 'CONTACT']
    : ['الرئيسية', 'الخدمات', 'الأجنحة الخاصة', 'المعرض', 'العضوية', 'اتصل'];

  const isRTL = language === 'ar';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background border-b border-primary'
            : 'bg-transparent'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="Elite Sanctuary Logo" 
              className="h-12 w-12 object-contain"
              data-testid="img-logo"
            />
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-foreground text-sm tracking-ultra hover-elevate px-3 py-2 rounded-md transition-all"
                data-testid={`link-nav-${index}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLanguageToggle}
              className="text-sm text-foreground hover-elevate px-3 py-2 rounded-md"
              data-testid="button-language-toggle"
            >
              {language === 'en' ? 'العربية' : 'EN'}
            </button>

            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-whatsapp"
              >
                <Phone className="h-5 w-5 text-primary" />
              </a>
              <Button 
                variant="default"
                className="bg-primary text-primary-foreground hover-elevate active-elevate-2"
                data-testid="button-book-now"
              >
                {language === 'en' ? 'Book Now' : 'احجز الآن'}
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-primary hover-elevate p-2 rounded-md"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background z-40 lg:hidden"
          style={{ top: '80px' }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-foreground text-2xl font-serif tracking-wide hover-elevate px-4 py-2 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${index}`}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
              <a 
                href="https://wa.me/971501234567" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  className="w-full border-primary text-primary hover-elevate active-elevate-2"
                  data-testid="button-mobile-whatsapp"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {language === 'en' ? 'WhatsApp' : 'واتساب'}
                </Button>
              </a>
              <Button 
                variant="default"
                className="w-full bg-primary text-primary-foreground hover-elevate active-elevate-2"
                data-testid="button-mobile-book"
              >
                {language === 'en' ? 'Book Now' : 'احجز الآن'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
