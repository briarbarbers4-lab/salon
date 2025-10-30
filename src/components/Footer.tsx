import { Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

interface FooterProps {
  language: 'en' | 'ar';
}

export default function Footer({ language }: FooterProps) {
  const isRTL = language === 'ar';

  const content = {
    en: {
      tagline: 'Elite Sanctuary - Where luxury meets artistry',
      rights: '2024 Elite Sanctuary. All rights reserved.',
      follow: 'Follow Us'
    },
    ar: {
      tagline: 'إليت سانكتشواري - حيث تلتقي الفخامة بالفن',
      rights: '2024 إليت سانكتشواري. جميع الحقوق محفوظة.',
      follow: 'تابعنا'
    }
  };

  const t = content[language];

  return (
    <footer 
      className="bg-background border-t border-border py-12 px-6 lg:px-8"
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-foreground font-serif text-lg mb-2" data-testid="text-footer-tagline">
              {t.tagline}
            </p>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-rights">
              {t.rights}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-footer-follow">
              {t.follow}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-md"
                data-testid="link-tiktok"
              >
                <SiTiktok className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
