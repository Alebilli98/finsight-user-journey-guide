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
    const saved = localStorage.getItem('tralis_language');
    return (saved as Language) || 'en'; // Default to English
  });

  useEffect(() => {
    localStorage.setItem('tralis_language', language);
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
    'nav.product': 'PRODOTTO',
    'nav.solutions': 'SOLUZIONI', 
    'nav.why': 'PERCHÉ TRALIS AI?',
    'nav.resources': 'RISORSE',
    'nav.pricing': 'PREZZI',
    'nav.login': 'Accedi',
    'nav.signup': 'Registrati Gratis',
    'nav.contact': 'Contattaci',
    'nav.glossary': 'Glossario',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.analytics': 'Analytics',
    'sidebar.reports': 'Report',
    'sidebar.financial-goal': 'Obiettivi Finanziari',
    'sidebar.learning-hub': 'Centro Formazione',
    'sidebar.calendar': 'Calendario',
    'sidebar.data-import': 'Importa Dati',
    
    // Header
    'header.profile': 'Profilo',
    'header.settings': 'Impostazioni',
    'header.logout': 'Esci',
    'header.plan': 'Piano',
    
    // Auth Modal
    'auth.welcome': 'Bentornato',
    'auth.credentials': 'Inserisci le tue credenziali per accedere alla tua dashboard Tralis AI',
    'auth.create': 'Crea Account',
    'auth.join': 'Unisciti a Tralis AI e sblocca il tuo potenziale finanziario',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.firstName': 'Nome',
    'auth.lastName': 'Cognome',
    'auth.company': 'Azienda',
    'auth.login': 'Accedi',
    'auth.signup': 'Crea Account',
    'auth.logging': 'Accesso in corso...',
    'auth.creating': 'Creazione account...',
    'auth.terms': 'Continuando, accetti i Termini di Servizio e la Privacy Policy di Tralis AI',
    
    // Dashboard
    'dashboard.title': 'Dashboard Finanziaria',
    'dashboard.welcome': 'Benvenuto nella tua dashboard finanziaria',
    'dashboard.overview': 'Panoramica',
    'dashboard.revenue': 'Ricavi',
    'dashboard.expenses': 'Spese',
    'dashboard.profit': 'Profitto',
    'dashboard.cashflow': 'Flusso di Cassa',
    'dashboard.month': 'Questo Mese',
    'dashboard.growth': 'Crescita',
    'dashboard.vs-last': 'vs mese scorso',
    
    // Analytics
    'analytics.title': 'Analytics Avanzate',
    'analytics.subtitle': 'Analisi approfondite delle tue performance finanziarie',
    'analytics.revenue-trend': 'Trend Ricavi',
    'analytics.expense-breakdown': 'Ripartizione Spese',
    'analytics.profit-margin': 'Margine di Profitto',
    'analytics.kpi': 'Indicatori Chiave',
    'analytics.forecast': 'Previsioni',
    'analytics.insights': 'Insights',
    
    // Reports
    'reports.title': 'Report Finanziari',
    'reports.subtitle': 'Genera e visualizza report dettagliati',
    'reports.monthly': 'Report Mensile',
    'reports.quarterly': 'Report Trimestrale',
    'reports.annual': 'Report Annuale',
    'reports.custom': 'Report Personalizzato',
    'reports.generate': 'Genera Report',
    'reports.download': 'Scarica',
    'reports.export': 'Esporta',
    
    // AI Solution
    'ai.title': 'Soluzione AI',
    'ai.subtitle': 'Assistente AI per analisi finanziarie avanzate',
    'ai.assistant': 'Assistente AI Tralis AI',
    'ai.analysis': 'Analisi automatica e comandi intelligenti per la tua azienda',
    'ai.ask': 'Chiedi al tuo assistente AI',
    'ai.send': 'Invia',
    'ai.suggestions': 'Suggerimenti',
    'ai.insights': 'Insights AI',
    
    // Lending
    'lending.title': 'Soluzioni di Finanziamento',
    'lending.subtitle': 'Trova le migliori opzioni di finanziamento per la tua azienda',
    'lending.options': 'Opzioni Disponibili',
    'lending.apply': 'Richiedi Finanziamento',
    'lending.calculator': 'Calcolatore Prestiti',
    'lending.eligibility': 'Verifica Idoneità',
    
    // Calendar
    'calendar.title': 'Calendario Finanziario',
    'calendar.subtitle': 'Gestisci scadenze e appuntamenti importanti',
    'calendar.events': 'Eventi',
    'calendar.deadlines': 'Scadenze',
    'calendar.meetings': 'Riunioni',
    'calendar.add': 'Aggiungi Evento',
    
    // Packages
    'packages.title': 'Pacchetti e Piani',
    'packages.subtitle': 'Scegli il piano perfetto per le tue esigenze',
    'packages.current': 'Piano Attuale',
    'packages.upgrade': 'Aggiorna',
    'packages.features': 'Funzionalità',
    'packages.contact': 'Contatta il Team',
    
    // Data Import
    'import.title': 'Importa Dati',
    'import.subtitle': 'Carica i tuoi dati finanziari',
    'import.upload': 'Carica File',
    'import.excel': 'File Excel',
    'import.csv': 'File CSV',
    'import.template': 'Scarica Template',
    'import.process': 'Elabora',
    
    // User Profile
    'profile.title': 'Profilo Utente',
    'profile.personal': 'Informazioni Personali',
    'profile.company': 'Informazioni Azienda',
    'profile.security': 'Sicurezza',
    'profile.save': 'Salva Modifiche',
    'profile.edit': 'Modifica',
    
    // Homepage Hero
    'hero.badge': 'Innovazione Globale',
    'hero.title': 'Libera il Potenziale',
    'hero.title.highlight': 'Finanziario',
    'hero.title.end': 'della Tua Startup',
    'hero.subtitle': 'Diamo potere alle startup e PMI per competere con aziende più grandi attraverso analisi finanziarie all\'avanguardia e consigli powered by AI. Trasforma la tua gestione finanziaria e sblocca il potenziale del tuo business.',
    'hero.cta.primary': 'Inizia Prova Gratuita',
    'hero.cta.secondary': 'Accedi al Tuo Account',
    
    // Video Section
    'video.title': 'Scopri Tralis AI in Azione',
    'video.subtitle': 'Guarda come Tralis AI trasforma la gestione finanziaria della tua azienda con un tour completo della piattaforma.',
    'video.tutorial.title': 'Tutorial Completo Tralis AI',
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
    'features.security.desc': 'Sicurezza di livello enterprise con piena conformità alle normative internazionali.',
    'features.funding.title': 'Preparazione Finanziamenti',
    'features.funding.desc': 'Preparati per gli investimenti con report finanziari completi e proiezioni.',
    
    // Testimonials
    'testimonials.title': 'Scelto da Aziende in Crescita',
    'testimonials.quote1': 'Tralis AI ha rivoluzionato il modo in cui gestiamo le nostre finanze. Gli insights AI sono incredibilmente accurati.',
    'testimonials.quote2': 'Finalmente, una piattaforma finanziaria costruita specificamente per le startup. Le dashboard sono incredibili!',
    
    // CTA Section
    'cta.title': 'Pronto a Trasformare la Tua Gestione Finanziaria?',
    'cta.subtitle': 'Unisciti a centinaia di startup che già usano Tralis AI per guidare la crescita e prendere decisioni migliori.',
    'cta.button': 'Inizia Oggi',
    
    // Language Selection
    'language.select': 'Seleziona Lingua',
    'language.italian': 'Italiano',
    'language.english': 'English',
    'language.spanish': 'Español',
    
    // Commerce Dashboard
    'commerce.dashboard.title': 'Dashboard Commerciale',
    'commerce.dashboard.subtitle': 'Panoramica completa delle performance commerciali',
    'commerce.total.revenue': 'Ricavi Totali',
    'commerce.operating.costs': 'Costi Operativi',
    'commerce.financial.costs': 'Costi Finanziari',
    'commerce.gross.margin': 'Margine Lordo',
    'commerce.total.customers': 'Clienti Totali',
    'commerce.monthly.orders': 'Ordini Mensili',
    'commerce.average.order.value': 'Valore Medio Ordine',
    'commerce.revenue.analysis': 'Analisi Ricavi e Costi',
    'commerce.revenue.description': 'Visualizzazione dettagliata dei ricavi, costi operativi e finanziari',
    'commerce.monthly.performance': 'Performance Mensile',
    'commerce.monthly.goals': 'Confronto con obiettivi mensili',
    'commerce.next.goals': 'Prossimi Obiettivi',
    'commerce.recommendations': 'Raccomandazioni per il prossimo mese',
    'commerce.vs.last.month': 'vs mese scorso',
    'commerce.positive.performance': 'Performance Positiva',
    'commerce.target': 'obiettivo',
    'commerce.excellent': 'Ottimo',
    'commerce.new.customers': 'Nuovi Clienti',
    'commerce.increase.revenue': 'Aumentare ricavi del 5%',
    'commerce.reduce.costs': 'Ridurre costi operativi del 2%',
    'commerce.acquire.customers': 'Acquisire 45 nuovi clienti',
    'commerce.increase.aov': 'Aumentare valore medio ordine',
    
    // DuPont Analysis
    'dupont.title': 'Analisi DuPont',
    'dupont.description': 'Scomponi il Return on Equity (ROE) nei suoi componenti chiave',
    'dupont.financial.analysis': 'Analisi Finanziaria',
    'dupont.equation': 'Equazione DuPont',
    'dupont.net.profit.margin': 'Margine di Profitto Netto',
    'dupont.asset.turnover': 'Rotazione degli Attivi',
    'dupont.equity.multiplier': 'Moltiplicatore di Equity',
    'dupont.return.on.equity': 'ROE (Return on Equity)',
    'dupont.equals': 'Uguale',
    'dupont.calculation': 'Calcolo',
    'dupont.industry.avg': 'Media settore',
    'dupont.roe.description': 'Redditività complessiva relativa al capitale proprio. ROE più alto indica un uso più efficiente del capitale.',
    'dupont.roe.calculation': 'Reddito Netto ÷ Capitale Proprio Totale',
    'dupont.npm.description': 'Efficienza di redditività - quanto profitto viene generato da ogni euro di ricavi.',
    'dupont.npm.calculation': 'Reddito Netto ÷ Ricavi',
    'dupont.at.description': 'Efficienza di utilizzo degli asset - quanto efficacemente gli asset vengono utilizzati per generare ricavi.',
    'dupont.at.calculation': 'Ricavi ÷ Attivi Totali',
    'dupont.em.description': 'Leva finanziaria - quanto gli asset sono finanziati da debito vs equity. Più alto = più indebitato.',
    'dupont.em.calculation': 'Attivi Totali ÷ Capitale Proprio Totale',
    'dupont.trend.analysis': 'Analisi Trend Componenti DuPont',
    'dupont.trend.description': 'Performance storica di ogni componente ROE',
    'dupont.key.insights': 'Insights Chiave',
    'dupont.profitability.driver': 'Driver di Redditività',
    'dupont.asset.efficiency': 'Efficienza degli Asset',
    'dupont.financial.leverage': 'Leva Finanziaria',
    'dupont.improvement.strategies': 'Strategie di Miglioramento ROE',
    'dupont.strong.margins': 'Margini di profitto forti indicano gestione efficiente dei costi e potere di prezzo.',
    'dupont.improve.margins': 'Considera di migliorare l\'efficienza operativa e il controllo dei costi per aumentare i margini.',
    'dupont.excellent.utilization': 'Ottimo utilizzo degli asset - generando ricavi forti dalla base di asset.',
    'dupont.focus.revenue': 'Concentrati sull\'aumentare la generazione di ricavi dagli asset esistenti o ottimizzare la base di asset.',
    'dupont.high.leverage': 'Alta leva finanziaria amplifica i ritorni ma aumenta il rischio finanziario.',
    'dupont.conservative.leverage': 'Leva conservativa fornisce stabilità ma può limitare il potenziale di crescita.',
    'dupont.increase.npm': 'Aumenta Margine di Profitto Netto',
    'dupont.optimize.pricing': 'Ottimizza strategie di prezzo',
    'dupont.reduce.costs': 'Riduci costi operativi',
    'dupont.improve.efficiency': 'Migliora efficienza operativa',
    'dupont.higher.margin': 'Concentrati su prodotti/servizi a margine più alto',
    'dupont.improve.at': 'Migliora Rotazione degli Asset',
    'dupont.increase.sales': 'Aumenta volume delle vendite',
    'dupont.optimize.inventory': 'Ottimizza gestione inventario',
    'dupont.improve.utilization': 'Migliora utilizzo degli asset',
    'dupont.divest.assets': 'Dismetti asset sottoperformanti',
    'dupont.optimize.leverage': 'Ottimizza Leva Finanziaria',
    'dupont.balance.financing': 'Bilancia finanziamento debito ed equity',
    'dupont.strategic.debt': 'Considera debito strategico per la crescita',
    'dupont.optimal.structure': 'Mantieni struttura del capitale ottimale',
    'dupont.monitor.risk': 'Monitora livelli di rischio finanziario',
    
    // Common
    'common.loading': 'Caricamento...',
    'common.error': 'Errore',
    'common.success': 'Successo',
    'common.cancel': 'Annulla',
    'common.confirm': 'Conferma',
    'common.delete': 'Elimina',
    'common.edit': 'Modifica',
    'common.save': 'Salva',
    'common.back': 'Indietro',
    'common.next': 'Avanti',
    'common.previous': 'Precedente',
    'common.close': 'Chiudi',
    'common.export': 'Esporta',
  },
  en: {
    // Navigation
    'nav.product': 'PRODUCT',
    'nav.solutions': 'SOLUTIONS',
    'nav.why': 'WHY TRALIS AI?',
    'nav.resources': 'RESOURCES',
    'nav.pricing': 'PRICING',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up Free',
    'nav.contact': 'Contact Us',
    'nav.glossary': 'Glossary',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.analytics': 'Analytics',
    'sidebar.reports': 'Reports',
    'sidebar.financial-goal': 'Financial Goal',
    'sidebar.learning-hub': 'Learning Hub',
    'sidebar.calendar': 'Calendar',
    'sidebar.data-import': 'Data Import',
    
    // Header
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    'header.logout': 'Logout',
    'header.plan': 'Plan',
    
    // Auth Modal
    'auth.welcome': 'Welcome Back',
    'auth.credentials': 'Enter your credentials to access your Tralis AI dashboard',
    'auth.create': 'Create Account',
    'auth.join': 'Join Tralis AI and unlock your financial potential',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.company': 'Company',
    'auth.login': 'Login',
    'auth.signup': 'Create Account',
    'auth.logging': 'Logging in...',
    'auth.creating': 'Creating account...',
    'auth.terms': 'By continuing, you agree to Tralis AI\'s Terms of Service and Privacy Policy',
    
    // Dashboard
    'dashboard.title': 'Financial Dashboard',
    'dashboard.welcome': 'Welcome to your financial dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.revenue': 'Revenue',
    'dashboard.expenses': 'Expenses',
    'dashboard.profit': 'Profit',
    'dashboard.cashflow': 'Cash Flow',
    'dashboard.month': 'This Month',
    'dashboard.growth': 'Growth',
    'dashboard.vs-last': 'vs last month',
    
    // Analytics
    'analytics.title': 'Advanced Analytics',
    'analytics.subtitle': 'Deep insights into your financial performance',
    'analytics.revenue-trend': 'Revenue Trend',
    'analytics.expense-breakdown': 'Expense Breakdown',
    'analytics.profit-margin': 'Profit Margin',
    'analytics.kpi': 'Key Indicators',
    'analytics.forecast': 'Forecast',
    'analytics.insights': 'Insights',
    
    // Reports
    'reports.title': 'Financial Reports',
    'reports.subtitle': 'Generate and view detailed reports',
    'reports.monthly': 'Monthly Report',
    'reports.quarterly': 'Quarterly Report',
    'reports.annual': 'Annual Report',
    'reports.custom': 'Custom Report',
    'reports.generate': 'Generate Report',
    'reports.download': 'Download',
    'reports.export': 'Export',
    
    // AI Solution
    'ai.title': 'AI Solution',
    'ai.subtitle': 'AI Assistant for advanced financial analysis',
    'ai.assistant': 'Tralis AI Assistant',
    'ai.analysis': 'Automated analysis and intelligent commands for your business',
    'ai.ask': 'Ask your AI assistant',
    'ai.send': 'Send',
    'ai.suggestions': 'Suggestions',
    'ai.insights': 'AI Insights',
    
    // Lending
    'lending.title': 'Lending Solutions',
    'lending.subtitle': 'Find the best financing options for your business',
    'lending.options': 'Available Options',
    'lending.apply': 'Apply for Financing',
    'lending.calculator': 'Loan Calculator',
    'lending.eligibility': 'Check Eligibility',
    
    // Calendar
    'calendar.title': 'Financial Calendar',
    'calendar.subtitle': 'Manage important deadlines and appointments',
    'calendar.events': 'Events',
    'calendar.deadlines': 'Deadlines',
    'calendar.meetings': 'Meetings',
    'calendar.add': 'Add Event',
    
    // Packages
    'packages.title': 'Packages & Plans',
    'packages.subtitle': 'Choose the perfect plan for your needs',
    'packages.current': 'Current Plan',
    'packages.upgrade': 'Upgrade',
    'packages.features': 'Features',
    'packages.contact': 'Contact Team',
    
    // Data Import
    'import.title': 'Data Import',
    'import.subtitle': 'Upload your financial data',
    'import.upload': 'Upload File',
    'import.excel': 'Excel File',
    'import.csv': 'CSV File',
    'import.template': 'Download Template',
    'import.process': 'Process',
    
    // User Profile
    'profile.title': 'User Profile',
    'profile.personal': 'Personal Information',
    'profile.company': 'Company Information',
    'profile.security': 'Security',
    'profile.save': 'Save Changes',
    'profile.edit': 'Edit',
    
    // Homepage Hero
    'hero.badge': 'Global Innovation',
    'hero.title': 'Unlock Your Startup\'s',
    'hero.title.highlight': 'Financial',
    'hero.title.end': 'Potential',
    'hero.subtitle': 'We empower startups and SMEs to compete with larger companies through cutting-edge financial analytics and AI-powered insights. Transform your financial management and unlock your business potential.',
    'hero.cta.primary': 'Start Free Trial',
    'hero.cta.secondary': 'Login to Your Account',
    
    // Video Section
    'video.title': 'Discover Tralis AI in Action',
    'video.subtitle': 'Watch how Tralis AI transforms your company\'s financial management with a complete platform tour.',
    'video.tutorial.title': 'Complete Tralis AI Tutorial',
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
    'features.security.desc': 'Enterprise-level security with full compliance to international regulations.',
    'features.funding.title': 'Funding Preparation',
    'features.funding.desc': 'Get ready for investments with comprehensive financial reports and projections.',
    
    // Testimonials
    'testimonials.title': 'Chosen by Growing Companies',
    'testimonials.quote1': 'Tralis AI has revolutionized how we manage our finances. The AI insights are incredibly accurate.',
    'testimonials.quote2': 'Finally, a financial platform built specifically for startups. The dashboards are amazing!',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Financial Management?',
    'cta.subtitle': 'Join hundreds of startups already using Tralis AI to drive growth and make better decisions.',
    'cta.button': 'Start Today',
    
    // Language Selection
    'language.select': 'Select Language',
    'language.italian': 'Italiano',
    'language.english': 'English',
    'language.spanish': 'Español',
    
    // Commerce Dashboard
    'commerce.dashboard.title': 'Commerce Dashboard',
    'commerce.dashboard.subtitle': 'Complete overview of commercial performance',
    'commerce.total.revenue': 'Total Revenue',
    'commerce.operating.costs': 'Operating Costs',
    'commerce.financial.costs': 'Financial Costs',
    'commerce.gross.margin': 'Gross Margin',
    'commerce.total.customers': 'Total Customers',
    'commerce.monthly.orders': 'Monthly Orders',
    'commerce.average.order.value': 'Average Order Value',
    'commerce.revenue.analysis': 'Revenue and Cost Analysis',
    'commerce.revenue.description': 'Detailed visualization of revenue, operating and financial costs',
    'commerce.monthly.performance': 'Monthly Performance',
    'commerce.monthly.goals': 'Comparison with monthly goals',
    'commerce.next.goals': 'Next Goals',
    'commerce.recommendations': 'Recommendations for next month',
    'commerce.vs.last.month': 'vs last month',
    'commerce.positive.performance': 'Positive Performance',
    'commerce.target': 'target',
    'commerce.excellent': 'Excellent',
    'commerce.new.customers': 'New Customers',
    'commerce.increase.revenue': 'Increase revenue by 5%',
    'commerce.reduce.costs': 'Reduce operating costs by 2%',
    'commerce.acquire.customers': 'Acquire 45 new customers',
    'commerce.increase.aov': 'Increase average order value',
    
    // DuPont Analysis
    'dupont.title': 'DuPont Analysis',
    'dupont.description': 'Break down Return on Equity (ROE) into its key components',
    'dupont.financial.analysis': 'Financial Analysis',
    'dupont.equation': 'DuPont Equation',
    'dupont.net.profit.margin': 'Net Profit Margin',
    'dupont.asset.turnover': 'Asset Turnover',
    'dupont.equity.multiplier': 'Equity Multiplier',
    'dupont.return.on.equity': 'Return on Equity (ROE)',
    'dupont.equals': 'Equals',
    'dupont.calculation': 'Calculation',
    'dupont.industry.avg': 'Industry avg',
    'dupont.roe.description': 'Overall profitability relative to shareholder equity. Higher ROE indicates more efficient use of equity.',
    'dupont.roe.calculation': 'Net Income ÷ Total Equity',
    'dupont.npm.description': 'Profitability efficiency - how much profit is generated from each euro of revenue.',
    'dupont.npm.calculation': 'Net Income ÷ Revenue',
    'dupont.at.description': 'Asset utilization efficiency - how effectively assets are used to generate revenue.',
    'dupont.at.calculation': 'Revenue ÷ Total Assets',
    'dupont.em.description': 'Financial leverage - how much assets are financed by debt vs equity. Higher = more leveraged.',
    'dupont.em.calculation': 'Total Assets ÷ Total Equity',
    'dupont.trend.analysis': 'DuPont Components Trend Analysis',
    'dupont.trend.description': 'Historical performance of each ROE component',
    'dupont.key.insights': 'Key Insights',
    'dupont.profitability.driver': 'Profitability Driver',
    'dupont.asset.efficiency': 'Asset Efficiency',
    'dupont.financial.leverage': 'Financial Leverage',
    'dupont.improvement.strategies': 'ROE Improvement Strategies',
    'dupont.strong.margins': 'Strong profit margins indicate efficient cost management and pricing power.',
    'dupont.improve.margins': 'Consider improving operational efficiency and cost control to boost margins.',
    'dupont.excellent.utilization': 'Excellent asset utilization - generating strong revenue from asset base.',
    'dupont.focus.revenue': 'Focus on increasing revenue generation from existing assets or optimizing asset base.',
    'dupont.high.leverage': 'High leverage amplifies returns but increases financial risk.',
    'dupont.conservative.leverage': 'Conservative leverage provides stability but may limit growth potential.',
    'dupont.increase.npm': 'Increase Net Profit Margin',
    'dupont.optimize.pricing': 'Optimize pricing strategies',
    'dupont.reduce.costs': 'Reduce operating costs',
    'dupont.improve.efficiency': 'Improve operational efficiency',
    'dupont.higher.margin': 'Focus on higher-margin products/services',
    'dupont.improve.at': 'Improve Asset Turnover',
    'dupont.increase.sales': 'Increase sales volume',
    'dupont.optimize.inventory': 'Optimize inventory management',
    'dupont.improve.utilization': 'Improve asset utilization',
    'dupont.divest.assets': 'Divest underperforming assets',
    'dupont.optimize.leverage': 'Optimize Financial Leverage',
    'dupont.balance.financing': 'Balance debt and equity financing',
    'dupont.strategic.debt': 'Consider strategic debt for growth',
    'dupont.optimal.structure': 'Maintain optimal capital structure',
    'dupont.monitor.risk': 'Monitor financial risk levels',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.save': 'Save',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.export': 'Export',
  },
  es: {
    // Navigation
    'nav.product': 'PRODUCTO',
    'nav.solutions': 'SOLUCIONES',
    'nav.why': '¿POR QUÉ TRALIS AI?',
    'nav.resources': 'RECURSOS',
    'nav.pricing': 'PRECIOS',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registro Gratis',
    'nav.contact': 'Contáctanos',
    'nav.glossary': 'Glosario',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.analytics': 'Analytics',
    'sidebar.reports': 'Reportes',
    'sidebar.financial-goal': 'Objetivos Financieros',
    'sidebar.learning-hub': 'Centro de Aprendizaje',
    'sidebar.calendar': 'Calendario',
    'sidebar.data-import': 'Importar Datos',
    
    // Header
    'header.profile': 'Perfil',
    'header.settings': 'Configuración',
    'header.logout': 'Cerrar Sesión',
    'header.plan': 'Plan',
    
    // Auth Modal
    'auth.welcome': 'Bienvenido de Vuelta',
    'auth.credentials': 'Ingresa tus credenciales para acceder a tu dashboard de Tralis AI',
    'auth.create': 'Crear Cuenta',
    'auth.join': 'Únete a Tralis AI y desbloquea tu potencial financiero',
    'auth.email': 'Email',
    'auth.password': 'Contraseña',
    'auth.firstName': 'Nombre',
    'auth.lastName': 'Apellido',
    'auth.company': 'Empresa',
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Crear Cuenta',
    'auth.logging': 'Iniciando sesión...',
    'auth.creating': 'Creando cuenta...',
    'auth.terms': 'Al continuar, aceptas los Términos de Servicio y Política de Privacidad de Tralis AI',
    
    // Dashboard
    'dashboard.title': 'Dashboard Financiero',
    'dashboard.welcome': 'Bienvenido a tu dashboard financiero',
    'dashboard.overview': 'Resumen',
    'dashboard.revenue': 'Ingresos',
    'dashboard.expenses': 'Gastos',
    'dashboard.profit': 'Ganancia',
    'dashboard.cashflow': 'Flujo de Efectivo',
    'dashboard.month': 'Este Mes',
    'dashboard.growth': 'Crecimiento',
    'dashboard.vs-last': 'vs mes pasado',
    
    // Analytics
    'analytics.title': 'Analytics Avanzados',
    'analytics.subtitle': 'Análisis profundos de tu rendimiento financiero',
    'analytics.revenue-trend': 'Tendencia de Ingresos',
    'analytics.expense-breakdown': 'Desglose de Gastos',
    'analytics.profit-margin': 'Margen de Ganancia',
    'analytics.kpi': 'Indicadores Clave',
    'analytics.forecast': 'Pronóstico',
    'analytics.insights': 'Insights',
    
    // Reports
    'reports.title': 'Reportes Financieros',
    'reports.subtitle': 'Genera y visualiza reportes detallados',
    'reports.monthly': 'Reporte Mensual',
    'reports.quarterly': 'Reporte Trimestral',
    'reports.annual': 'Reporte Anual',
    'reports.custom': 'Reporte Personalizado',
    'reports.generate': 'Generar Reporte',
    'reports.download': 'Descargar',
    'reports.export': 'Exportar',
    
    // AI Solution
    'ai.title': 'Solución AI',
    'ai.subtitle': 'Asistente AI para análisis financiero avanzado',
    'ai.assistant': 'Asistente Tralis AI',
    'ai.analysis': 'Análisis automático y comandos inteligentes para tu negocio',
    'ai.ask': 'Pregunta a tu asistente AI',
    'ai.send': 'Enviar',
    'ai.suggestions': 'Sugerencias',
    'ai.insights': 'Insights AI',
    
    // Lending
    'lending.title': 'Soluciones de Financiamiento',
    'lending.subtitle': 'Encuentra las mejores opciones de financiamiento para tu negocio',
    'lending.options': 'Opciones Disponibles',
    'lending.apply': 'Solicitar Financiamiento',
    'lending.calculator': 'Calculadora de Préstamos',
    'lending.eligibility': 'Verificar Elegibilidad',
    
    // Calendar
    'calendar.title': 'Calendario Financiero',
    'calendar.subtitle': 'Gestiona fechas límite y citas importantes',
    'calendar.events': 'Eventos',
    'calendar.deadlines': 'Fechas Límite',
    'calendar.meetings': 'Reuniones',
    'calendar.add': 'Agregar Evento',
    
    // Packages
    'packages.title': 'Paquetes y Planes',
    'packages.subtitle': 'Elige el plan perfecto para tus necesidades',
    'packages.current': 'Plan Actual',
    'packages.upgrade': 'Actualizar',
    'packages.features': 'Características',
    'packages.contact': 'Contactar Equipo',
    
    // Data Import
    'import.title': 'Importar Datos',
    'import.subtitle': 'Sube tus datos financieros',
    'import.upload': 'Subir Archivo',
    'import.excel': 'Archivo Excel',
    'import.csv': 'Archivo CSV',
    'import.template': 'Descargar Plantilla',
    'import.process': 'Procesar',
    
    // User Profile
    'profile.title': 'Perfil de Usuario',
    'profile.personal': 'Información Personal',
    'profile.company': 'Información de Empresa',
    'profile.security': 'Seguridad',
    'profile.save': 'Guardar Cambios',
    'profile.edit': 'Editar',
    
    // Homepage Hero
    'hero.badge': 'Innovación Global',
    'hero.title': 'Desbloquea el Potencial',
    'hero.title.highlight': 'Financiero',
    'hero.title.end': 'de tu Startup',
    'hero.subtitle': 'Empoderamos a startups y PyMEs para competir con empresas más grandes a través de análisis financieros de vanguardia e insights impulsados por IA. Transforma tu gestión financiera y desbloquea el potencial de tu negocio.',
    'hero.cta.primary': 'Iniciar Prueba Gratuita',
    'hero.cta.secondary': 'Acceder a tu Cuenta',
    
    // Video Section
    'video.title': 'Descubre Tralis AI en Acción',
    'video.subtitle': 'Mira cómo Tralis AI transforma la gestión financiera de tu empresa con un tour completo de la plataforma.',
    'video.tutorial.title': 'Tutorial Completo de Tralis AI',
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
    'features.security.desc': 'Seguridad de nivel empresarial con pleno cumplimiento de regulaciones internacionales.',
    'features.funding.title': 'Preparación de Financiamiento',
    'features.funding.desc': 'Prepárate para inversiones con reportes financieros integrales y proyecciones.',
    
    // Testimonials
    'testimonials.title': 'Elegido por Empresas en Crecimiento',
    'testimonials.quote1': 'Tralis AI ha revolucionado la forma en que gestionamos nuestras finanzas. Los insights de IA son increíblemente precisos.',
    'testimonials.quote2': '¡Finalmente, una plataforma financiera construida específicamente para startups. Los dashboards son increíbles!',
    
    // CTA Section  
    'cta.title': '¿Listo para Transformar tu Gestión Financiera?',
    'cta.subtitle': 'Únete a cientos de startups que ya usan Tralis AI para impulsar el crecimiento y tomar mejores decisiones.',
    'cta.button': 'Comenzar Hoy',
    
    // Language Selection
    'language.select': 'Seleccionar Idioma',
    'language.italian': 'Italiano',
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    
    // Commerce Dashboard
    'commerce.dashboard.title': 'Dashboard Comercial',
    'commerce.dashboard.subtitle': 'Resumen completo del rendimiento comercial',
    'commerce.total.revenue': 'Ingresos Totales',
    'commerce.operating.costs': 'Costos Operativos',
    'commerce.financial.costs': 'Costos Financieros',
    'commerce.gross.margin': 'Margen Bruto',
    'commerce.total.customers': 'Clientes Totales',
    'commerce.monthly.orders': 'Pedidos Mensuales',
    'commerce.average.order.value': 'Valor Promedio del Pedido',
    'commerce.revenue.analysis': 'Análisis de Ingresos y Costos',
    'commerce.revenue.description': 'Visualización detallada de ingresos, costos operativos y financieros',
    'commerce.monthly.performance': 'Rendimiento Mensual',
    'commerce.monthly.goals': 'Comparación con objetivos mensuales',
    'commerce.next.goals': 'Próximos Objetivos',
    'commerce.recommendations': 'Recomendaciones para el próximo mes',
    'commerce.vs.last.month': 'vs mes pasado',
    'commerce.positive.performance': 'Rendimiento Positivo',
    'commerce.target': 'objetivo',
    'commerce.excellent': 'Excelente',
    'commerce.new.customers': 'Nuevos Clientes',
    'commerce.increase.revenue': 'Aumentar ingresos en 5%',
    'commerce.reduce.costs': 'Reducir costos operativos en 2%',
    'commerce.acquire.customers': 'Adquirir 45 nuevos clientes',
    'commerce.increase.aov': 'Aumentar valor promedio del pedido',
    
    // DuPont Analysis
    'dupont.title': 'Análisis DuPont',
    'dupont.description': 'Desglosa el Retorno sobre el Patrimonio (ROE) en sus componentes clave',
    'dupont.financial.analysis': 'Análisis Financiero',
    'dupont.equation': 'Ecuación DuPont',
    'dupont.net.profit.margin': 'Margen de Ganancia Neta',
    'dupont.asset.turnover': 'Rotación de Activos',
    'dupont.equity.multiplier': 'Multiplicador de Patrimonio',
    'dupont.return.on.equity': 'ROE (Retorno sobre Patrimonio)',
    'dupont.equals': 'Igual',
    'dupont.calculation': 'Cálculo',
    'dupont.industry.avg': 'Promedio industria',
    'dupont.roe.description': 'Rentabilidad general relativa al patrimonio de los accionistas. ROE más alto indica uso más eficiente del patrimonio.',
    'dupont.roe.calculation': 'Ingreso Neto ÷ Patrimonio Total',
    'dupont.npm.description': 'Eficiencia de rentabilidad - cuánta ganancia se genera de cada euro de ingresos.',
    'dupont.npm.calculation': 'Ingreso Neto ÷ Ingresos',
    'dupont.at.description': 'Eficiencia de utilización de activos - qué tan efectivamente se usan los activos para generar ingresos.',
    'dupont.at.calculation': 'Ingresos ÷ Activos Totales',
    'dupont.em.description': 'Apalancamiento financiero - cuánto se financian los activos con deuda vs patrimonio. Más alto = más apalancado.',
    'dupont.em.calculation': 'Activos Totales ÷ Patrimonio Total',
    'dupont.trend.analysis': 'Análisis de Tendencias Componentes DuPont',
    'dupont.trend.description': 'Rendimiento histórico de cada componente ROE',
    'dupont.key.insights': 'Insights Clave',
    'dupont.profitability.driver': 'Impulsor de Rentabilidad',
    'dupont.asset.efficiency': 'Eficiencia de Activos',
    'dupont.financial.leverage': 'Apalancamiento Financiero',
    'dupont.improvement.strategies': 'Estrategias de Mejora ROE',
    'dupont.strong.margins': 'Márgenes de ganancia fuertes indican gestión eficiente de costos y poder de precios.',
    'dupont.improve.margins': 'Considera mejorar la eficiencia operativa y el control de costos para impulsar los márgenes.',
    'dupont.excellent.utilization': 'Excelente utilización de activos - generando ingresos fuertes de la base de activos.',
    'dupont.focus.revenue': 'Enfócate en aumentar la generación de ingresos de activos existentes u optimizar la base de activos.',
    'dupont.high.leverage': 'El alto apalancamiento amplifica los retornos pero aumenta el riesgo financiero.',
    'dupont.conservative.leverage': 'El apalancamiento conservador proporciona estabilidad pero puede limitar el potencial de crecimiento.',
    'dupont.increase.npm': 'Aumentar Margen de Ganancia Neta',
    'dupont.optimize.pricing': 'Optimizar estrategias de precios',
    'dupont.reduce.costs': 'Reducir costos operativos',
    'dupont.improve.efficiency': 'Mejorar eficiencia operativa',
    'dupont.higher.margin': 'Enfocarse en productos/servicios de mayor margen',
    'dupont.improve.at': 'Mejorar Rotación de Activos',
    'dupont.increase.sales': 'Aumentar volumen de ventas',
    'dupont.optimize.inventory': 'Optimizar gestión de inventario',
    'dupont.improve.utilization': 'Mejorar utilización de activos',
    'dupont.divest.assets': 'Desinvertir activos de bajo rendimiento',
    'dupont.optimize.leverage': 'Optimizar Apalancamiento Financiero',
    'dupont.balance.financing': 'Equilibrar financiamiento de deuda y patrimonio',
    'dupont.strategic.debt': 'Considerar deuda estratégica para crecimiento',
    'dupont.optimal.structure': 'Mantener estructura de capital óptima',
    'dupont.monitor.risk': 'Monitorear niveles de riesgo financiero',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.save': 'Guardar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.close': 'Cerrar',
    'common.export': 'Exportar',
  }
};
