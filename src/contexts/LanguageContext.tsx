
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'it' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('finsight_language');
    return (saved as Language) || 'it';
  });

  useEffect(() => {
    localStorage.setItem('finsight_language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  it: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.pricing': 'Prezzi',
    'nav.contact': 'Contatti',
    'nav.login': 'Accedi',
    'nav.signup': 'Registrati Gratis',
    
    // Homepage Hero
    'hero.badge': 'Basato a Dubai, UAE',
    'hero.title': 'Libera il Potenziale',
    'hero.title.highlight': 'Finanziario',
    'hero.title.end': 'della Tua Startup',
    'hero.subtitle': 'Diamo potere alle startup e PMI per competere con aziende più grandi attraverso analisi finanziarie all\'avanguardia e consigli powered by AI. Trasforma la tua gestione finanziaria e sblocca il potenziale del tuo business.',
    'hero.cta.primary': 'Inizia Prova Gratuita',
    'hero.cta.secondary': 'Accedi al Tuo Account',
    
    // Video Section
    'video.title': 'Scopri FinSight in Azione',
    'video.subtitle': 'Guarda come FinSight trasforma la gestione finanziaria della tua azienda con un tour completo della piattaforma.',
    'video.tutorial.title': 'Tutorial Completo FinSight',
    'video.tutorial.duration': 'Durata: 8 minuti',
    'video.tutorial.cta': 'Guarda il Video',
    'video.card1.title': 'Dashboard Finanziaria',
    'video.card1.desc': 'Visualizza KPI e metriche in tempo reale',
    'video.card2.title': 'AI Analytics',
    'video.card2.desc': 'Insights predittivi e raccomandazioni',
    'video.card3.title': 'Report Avanzati',
    'video.card3.desc': 'Documenti pronti per investitori',
    
    // Features
    'features.title': 'Tutto Quello che Ti Serve per Padroneggiare le Tue Finanze',
    'features.subtitle': 'La nostra piattaforma completa fornisce tutti gli strumenti e insights necessari per prendere decisioni finanziarie informate e guidare la crescita.',
    'features.dashboard.title': 'Dashboard in Tempo Reale',
    'features.dashboard.desc': 'Monitora la salute finanziaria della tua azienda con visualizzazioni intuitive e indicatori chiave di performance.',
    'features.ai.title': 'Insights Powered by AI',
    'features.ai.desc': 'Ricevi raccomandazioni personalizzate e analisi predittive su misura per la tua attività.',
    'features.security.title': 'Sicuro e Conforme',
    'features.security.desc': 'Sicurezza di livello enterprise con piena conformità GDPR e regolamenti Dubai Free Zone.',
    'features.funding.title': 'Preparazione Finanziamenti',
    'features.funding.desc': 'Preparati per gli investimenti con report finanziari completi e proiezioni.',
    
    // Testimonials
    'testimonials.title': 'Scelto da Aziende in Crescita',
    'testimonials.quote1': 'FinSight ha rivoluzionato il modo in cui gestiamo le nostre finanze. Gli insights AI sono incredibilmente accurati.',
    'testimonials.quote2': 'Finalmente, una piattaforma finanziaria costruita specificamente per le startup. Le dashboard sono incredibili!',
    
    // CTA Section
    'cta.title': 'Pronto a Trasformare la Tua Gestione Finanziaria?',
    'cta.subtitle': 'Unisciti a centinaia di startup che già usano FinSight per guidare la crescita e prendere decisioni migliori.',
    'cta.button': 'Inizia Oggi',
    
    // Footer
    'footer.tagline': 'La Tua Guida Finanziaria',
    'footer.description': 'Diamo potere alle startup e PMI con intelligenza finanziaria powered by AI.',
    'footer.product': 'Prodotto',
    'footer.company': 'Azienda',
    'footer.legal': 'Legale',
    'footer.copyright': '© 2024 FinSight. Tutti i diritti riservati. Dubai International Free Zone Authority (IFZA)',
    
    // Language Selection
    'language.select': 'Seleziona Lingua',
    'language.italian': 'Italiano',
    'language.english': 'English',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up Free',
    
    // Homepage Hero
    'hero.badge': 'Based in Dubai, UAE',
    'hero.title': 'Unlock Your Startup\'s',
    'hero.title.highlight': 'Financial',
    'hero.title.end': 'Potential',
    'hero.subtitle': 'We empower startups and SMEs to compete with larger companies through cutting-edge financial analytics and AI-powered insights. Transform your financial management and unlock your business potential.',
    'hero.cta.primary': 'Start Free Trial',
    'hero.cta.secondary': 'Login to Your Account',
    
    // Video Section
    'video.title': 'Discover FinSight in Action',
    'video.subtitle': 'Watch how FinSight transforms your company\'s financial management with a complete platform tour.',
    'video.tutorial.title': 'Complete FinSight Tutorial',
    'video.tutorial.duration': 'Duration: 8 minutes',
    'video.tutorial.cta': 'Watch Video',
    'video.card1.title': 'Financial Dashboard',
    'video.card1.desc': 'View KPIs and real-time metrics',
    'video.card2.title': 'AI Analytics',
    'video.card2.desc': 'Predictive insights and recommendations',
    'video.card3.title': 'Advanced Reports',
    'video.card3.desc': 'Investor-ready documents',
    
    // Features
    'features.title': 'Everything You Need to Master Your Finances',
    'features.subtitle': 'Our comprehensive platform provides all the tools and insights needed to make informed financial decisions and drive growth.',
    'features.dashboard.title': 'Real-Time Dashboard',
    'features.dashboard.desc': 'Monitor your company\'s financial health with intuitive visualizations and key performance indicators.',
    'features.ai.title': 'AI-Powered Insights',
    'features.ai.desc': 'Get personalized recommendations and predictive analytics tailored to your business.',
    'features.security.title': 'Secure & Compliant',
    'features.security.desc': 'Enterprise-level security with full GDPR compliance and Dubai Free Zone regulations.',
    'features.funding.title': 'Funding Preparation',
    'features.funding.desc': 'Get ready for investments with comprehensive financial reports and projections.',
    
    // Testimonials
    'testimonials.title': 'Chosen by Growing Companies',
    'testimonials.quote1': 'FinSight has revolutionized how we manage our finances. The AI insights are incredibly accurate.',
    'testimonials.quote2': 'Finally, a financial platform built specifically for startups. The dashboards are amazing!',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Financial Management?',
    'cta.subtitle': 'Join hundreds of startups already using FinSight to drive growth and make better decisions.',
    'cta.button': 'Start Today',
    
    // Footer
    'footer.tagline': 'Your Financial Guide',
    'footer.description': 'We empower startups and SMEs with AI-powered financial intelligence.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2024 FinSight. All rights reserved. Dubai International Free Zone Authority (IFZA)',
    
    // Language Selection
    'language.select': 'Select Language',
    'language.italian': 'Italiano',
    'language.english': 'English',
  }
};
