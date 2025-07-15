
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'it' | 'en' | 'es';

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
    'nav.home': 'HOME',
    'nav.about': 'CHI SIAMO',
    'nav.pricing': 'PREZZI',
    'nav.contact': 'CONTATTI',
    'nav.login': 'Accedi',
    'nav.signup': 'Registrati Gratis',
    'nav.resources': 'RISORSE',
    'nav.glossary': 'Glossario',
    
    // Homepage Hero
    'hero.badge': 'Innovazione Globale',
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
    'language.spanish': 'Español',
    
    // Resources Section
    'resources.subtitle': 'Accedi a risorse e definizioni utili per la gestione finanziaria',
    'glossary.description': 'Termini finanziari e metriche essenziali per la tua attività',
    'glossary.financial.title': 'Termini Finanziari',
    'glossary.metrics.title': 'Metriche Chiave',
    'glossary.roi': 'Ritorno sugli Investimenti - misura l\'efficacia di un investimento',
    'glossary.ebitda': 'Earnings Before Interest, Taxes, Depreciation and Amortization',
    'glossary.cashflow': 'Flusso di cassa - movimento di denaro in entrata e uscita',
    'glossary.liquidity': 'Capacità di convertire rapidamente asset in contanti',
    'glossary.kpi': 'Key Performance Indicators - indicatori di performance',
    'glossary.grossmargin': 'Differenza tra ricavi e costi diretti',
    'glossary.debtratio': 'Rapporto tra debiti totali e patrimonio netto',
    'glossary.workingcapital': 'Capitale circolante netto per operazioni quotidiane',
  },
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.about': 'ABOUT US',
    'nav.pricing': 'PRICING',
    'nav.contact': 'CONTACT',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up Free',
    'nav.resources': 'RESOURCES',
    'nav.glossary': 'Glossary',
    
    // Homepage Hero
    'hero.badge': 'Global Innovation',
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
    'language.spanish': 'Español',
    
    // Resources Section
    'resources.subtitle': 'Access useful resources and definitions for financial management',
    'glossary.description': 'Essential financial terms and metrics for your business',
    'glossary.financial.title': 'Financial Terms',
    'glossary.metrics.title': 'Key Metrics',
    'glossary.roi': 'Return on Investment - measures the effectiveness of an investment',
    'glossary.ebitda': 'Earnings Before Interest, Taxes, Depreciation and Amortization',
    'glossary.cashflow': 'Cash flow - movement of money in and out of business',
    'glossary.liquidity': 'Ability to quickly convert assets into cash',
    'glossary.kpi': 'Key Performance Indicators - performance metrics',
    'glossary.grossmargin': 'Difference between revenue and direct costs',
    'glossary.debtratio': 'Ratio between total debt and equity',
    'glossary.workingcapital': 'Net working capital for daily operations',
  },
  es: {
    // Navigation
    'nav.home': 'INICIO',
    'nav.about': 'NOSOTROS',
    'nav.pricing': 'PRECIOS',
    'nav.contact': 'CONTACTO',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registro Gratis',
    'nav.resources': 'RECURSOS',
    'nav.glossary': 'Glosario',
    
    // Homepage Hero
    'hero.badge': 'Innovación Global',
    'hero.title': 'Desbloquea el Potencial',
    'hero.title.highlight': 'Financiero',
    'hero.title.end': 'de tu Startup',
    'hero.subtitle': 'Empoderamos a startups y PyMEs para competir con empresas más grandes a través de análisis financieros de vanguardia e insights impulsados por IA. Transforma tu gestión financiera y desbloquea el potencial de tu negocio.',
    'hero.cta.primary': 'Iniciar Prueba Gratuita',
    'hero.cta.secondary': 'Acceder a tu Cuenta',
    
    // Video Section
    'video.title': 'Descubre FinSight en Acción',
    'video.subtitle': 'Mira cómo FinSight transforma la gestión financiera de tu empresa con un tour completo de la plataforma.',
    'video.tutorial.title': 'Tutorial Completo de FinSight',
    'video.tutorial.duration': 'Duración: 8 minutos',
    'video.tutorial.cta': 'Ver Video',
    'video.card1.title': 'Panel Financiero',
    'video.card1.desc': 'Visualiza KPIs y métricas en tiempo real',
    'video.card2.title': 'Análisis con IA',
    'video.card2.desc': 'Insights predictivos y recomendaciones',
    'video.card3.title': 'Reportes Avanzados',
    'video.card3.desc': 'Documentos listos para inversores',
    
    // Features
    'features.title': 'Todo lo que Necesitas para Dominar tus Finanzas',
    'features.subtitle': 'Nuestra plataforma integral proporciona todas las herramientas e insights necesarios para tomar decisiones financieras informadas e impulsar el crecimiento.',
    'features.dashboard.title': 'Dashboard en Tiempo Real',
    'features.dashboard.desc': 'Monitorea la salud financiera de tu empresa con visualizaciones intuitivas e indicadores clave de rendimiento.',
    'features.ai.title': 'Insights Impulsados por IA',
    'features.ai.desc': 'Obtén recomendaciones personalizadas y análisis predictivos adaptados a tu negocio.',
    'features.security.title': 'Seguro y Conforme',
    'features.security.desc': 'Seguridad de nivel empresarial con pleno cumplimiento GDPR y regulaciones de Zona Franca de Dubai.',
    'features.funding.title': 'Preparación de Financiamiento',
    'features.funding.desc': 'Prepárate para inversiones con reportes financieros integrales y proyecciones.',
    
    // Testimonials
    'testimonials.title': 'Elegido por Empresas en Crecimiento',
    'testimonials.quote1': 'FinSight ha revolucionado la forma en que gestionamos nuestras finanzas. Los insights de IA son increíblemente precisos.',
    'testimonials.quote2': '¡Finalmente, una plataforma financiera construida específicamente para startups. Los dashboards son increíbles!',
    
    // CTA Section
    'cta.title': '¿Listo para Transformar tu Gestión Financiera?',
    'cta.subtitle': 'Únete a cientos de startups que ya usan FinSight para impulsar el crecimiento y tomar mejores decisiones.',
    'cta.button': 'Comenzar Hoy',
    
    // Footer
    'footer.tagline': 'Tu Guía Financiera',
    'footer.description': 'Empoderamos a startups y PyMEs con inteligencia financiera impulsada por IA.',
    'footer.product': 'Producto',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.copyright': '© 2024 FinSight. Todos los derechos reservados. Autoridad de Zona Libre Internacional de Dubai (IFZA)',
    
    // Language Selection
    'language.select': 'Seleccionar Idioma',
    'language.italian': 'Italiano',
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    
    // Resources Section
    'resources.subtitle': 'Accede a recursos útiles y definiciones para la gestión financiera',
    'glossary.description': 'Términos financieros y métricas esenciales para tu negocio',
    'glossary.financial.title': 'Términos Financieros',
    'glossary.metrics.title': 'Métricas Clave',
    'glossary.roi': 'Retorno de la Inversión - mide la efectividad de una inversión',
    'glossary.ebitda': 'Ganancias antes de Intereses, Impuestos, Depreciación y Amortización',
    'glossary.cashflow': 'Flujo de efectivo - movimiento de dinero entrante y saliente',
    'glossary.liquidity': 'Capacidad de convertir rápidamente activos en efectivo',
    'glossary.kpi': 'Indicadores Clave de Rendimiento - métricas de rendimiento',
    'glossary.grossmargin': 'Diferencia entre ingresos y costos directos',
    'glossary.debtratio': 'Relación entre deuda total y patrimonio',
    'glossary.workingcapital': 'Capital de trabajo neto para operaciones diarias',
  }
};
