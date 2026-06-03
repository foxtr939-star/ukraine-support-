/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  DollarSign, 
  FileCheck, 
  Smartphone, 
  Users, 
  ArrowRight,
  ClipboardCheck,
  Wifi,
  Tv,
  Bed,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { TRANSLATIONS } from './data';
import { LanguageCode } from './types';

// Apartment gallery image paths
const apartment1 = '/src/assets/images/apartment_1_1780495319145.png';
const apartment2 = '/src/assets/images/apartment_2_1780495342818.png';
const apartment3 = '/src/assets/images/apartment_3_1780495357349.png';
const apartment4 = '/src/assets/images/apartment_4_1780495371948.png';
const apartment5 = '/src/assets/images/apartment_5_1780495386279.png';
const apartment6 = '/src/assets/images/apartment_6_1780495403087.png';

const HOUSING_TRANSLATIONS = {
  RU: {
    sectionTitle: 'Гарантированное жилье',
    sectionSubtitle: 'Примеры апартаментов для заселения',
    desc: 'Мы предлагаем полностью оборудованные квартиры в безопасных центральных и западных регионах Украины. Все варианты проходят строгий аудит безопасности и бытового комфорта.',
    badge: 'КВАРТИРНЫЙ ФОНД',
    amenities: 'Оснащение квартир',
    status: 'Статус',
    available: 'Свободна / Готова к бронированию',
    location: 'Регион',
    safeRegion: 'Безопасная зона (Центральная / Западная Украина)',
    details: 'Характеристики:',
    beds: 'Спальные места: 2+ (ортопедический матрас)',
    wifi: 'Интернет: Скоростной оптоволоконный Wi-Fi (до 100 Мбит/с)',
    appliances: 'Бытовая техника: Стиральная машина, плита, холодильник, микроволновка',
    shelter: 'Безопасность: Сертифицированное укрытие в шаговой доступности (до 2 мин)',
    guaranteeTitle: 'Наши жилищные стандарты',
    g1: 'Заселение в день приезда — куратор встречает вас у дверей',
    g2: 'Качественный ремонт, чистое белье и полный комплект посуды',
    g3: 'Юридический договор аренды включен в организационный взнос',
    g4: 'Оплата коммунальных услуг за первый месяц полностью покрыта',
    btnBook: 'Забронировать это жилье',
    zoomHint: 'Кликните на изображение для увеличения',
  },
  UA: {
    sectionTitle: 'Гарантоване житло',
    sectionSubtitle: 'Приклади апартаментів для заселення',
    desc: 'Ми пропонуємо повністю обладнані квартири у безпечних центральних та західних регіонах України. Усі варіанти проходять суворий аудит безпеки та побутового комфорту.',
    badge: 'КВАРТИРНИЙ ФОНД',
    amenities: 'Оснащення квартир',
    status: 'Статус',
    available: 'Вільна / Готова до бронювання',
    location: 'Регіон',
    safeRegion: 'Безпечна зона (Центральна / Західна Україна)',
    details: 'Характеристики:',
    beds: 'Спальні місця: 2+ (ортопедичний матрац)',
    wifi: 'Інтернет: Швидкісний оптоволоконний Wi-Fi (до 100 Мбіт/с)',
    appliances: 'Побутова техніка: Пральна машина, плита, холодильник, мікрохвильовка',
    shelter: 'Безпека: Сертифіковане укриття в кроковій доступності (до 2 хв)',
    guaranteeTitle: 'Наші житлові стандарти',
    g1: 'Заселення в день приїзду — куратор зустрічає вас біля дверей',
    g2: 'Якісний ремонт, чиста білизна та повний комплект посуду',
    g3: 'Юридичний договір оренди включений в організаційний внесок',
    g4: 'Оплата комунальних послуг за перший місяць повністю покрита',
    btnBook: 'Забронювати це житло',
    zoomHint: 'Клікніть на зображення для збільшення',
  },
  EN: {
    sectionTitle: 'Guaranteed Partner Lodging',
    sectionSubtitle: 'Sample Apartments for Relocation',
    desc: 'We provide fully furnished and equipped apartments in the safest central and western regions of Ukraine. Every unit undergoes strict security and comfort checks.',
    badge: 'APARTMENT FUND',
    amenities: 'Apartment Amenities',
    status: 'Status',
    available: 'Available / Ready for booking',
    location: 'Region',
    safeRegion: 'Safe Zone (Central / Western Ukraine)',
    details: 'Details:',
    beds: 'Beds: 2+ (orthopedic mattress)',
    wifi: 'Internet: High-speed fiber-optic Wi-Fi (up to 100 Mbps)',
    appliances: 'Appliances: Washing machine, stove, fridge, microwave',
    shelter: 'Security: Certified shelter within walking distance (under 2 mins)',
    guaranteeTitle: 'Our Housing Standards',
    g1: 'Same-day check-in — your assistant welcomes you on-site',
    g2: 'Modern interior, fresh linens, and full kitchenware provided',
    g3: 'Official lease agreement fully covered by the initiation fee',
    g4: 'Utility bills for the first month are completely covered',
    btnBook: 'Request Booking for this Unit',
    zoomHint: 'Click image to enlarge',
  },
  HI: {
    sectionTitle: 'गारंटीकृत आवास व्यवस्था',
    sectionSubtitle: 'स्थानांतरण के लिए चुनिंदा अपार्टमेंट',
    desc: 'हम यूक्रेन के सबसे सुरक्षित मध्य और पश्चिमी भागों में पूर्ण सुसज्जित फ्लैट प्रदान करते हैं। प्रत्येक इकाई की सुरक्षा और आराम मानकों की जांच की जाती है।',
    badge: 'आवास कोष',
    amenities: 'अपार्टमेंट की सुविधाएं',
    status: 'स्थिति',
    available: 'उपलब्ध / बुकिंग के लिए तैयार',
    location: 'क्षेत्र',
    safeRegion: 'सुरक्षित क्षेत्र (मध्य / पश्चिमी यूक्रेन)',
    details: 'विवरण:',
    beds: 'बिस्तर: 2+ (आर्थोपेडिक गद्दे के साथ)',
    wifi: 'इंटरनेट: हाई-स्पीड फाइबर वाई-फाई (100 Mbps तक)',
    appliances: 'उपकरण: वाशिंग मशीन, चूल्हा, फ्रिज, माइक्रोवेव',
    shelter: 'सुरक्षा: पैदल दूरी पर प्रमाणित शरणस्थल (2 मिनट से कम)',
    guaranteeTitle: 'हमारे आवास मानक',
    g1: 'आगमन पर उसी दिन प्रवेश — आपका सहायक व्यक्तिगत रूप से स्वागत करेगा',
    g2: 'गुणवत्तापूर्ण इंटीरियर, साफ लिनन और रसोई के बर्तन उपलब्ध',
    g3: 'आधिकारिक पट्टा समझौता संगठन शुल्क में पूरी तरह शामिल',
    g4: 'पहले महीने का उपयोगिता बिल (बिजली/पानी) पूरी तरह कवर किया गया है',
    btnBook: 'इस फ्लैट की बुकिंग का अनुरोध करें',
    zoomHint: 'बड़ा करने के लिए छवि पर क्लिक करें',
  },
  UR: {
    sectionTitle: 'عارضی رہائش کا انتظام',
    sectionSubtitle: 'رہائش کے نمونے اپارٹمنٹس',
    desc: 'ہم یوکرین کے مستحکم اور انتہائی پرامن مرکزی اور مغربی علاقوں میں مکمل فرنشڈ فلیٹ تیار فراہم کرتے ہیں۔ ہر جگہ سیکیورٹی اور ہوم آرام دہ چیک سے گزرتی ہے۔',
    badge: 'اپارٹمنٹس فنڈ',
    amenities: 'اپارٹمنٹس کی خصوصیات',
    status: 'اسٹیٹس',
    available: 'دستیاب / بکنگ کے لیے تیار',
    location: 'علاقہ',
    safeRegion: 'محفوظ زون (وسطی / مغربی یوکرین)',
    details: 'تفصیلات:',
    beds: 'بیڈز: 2+ (آرتھوپیڈک گدے کے ساتھ)',
    wifi: 'انٹرنیٹ: تیز ترین فائبر وائی فائی (100 Mbps تک)',
    appliances: 'برقی اشیاء: واشنگ مشین، چولہا، فریج، مائیکرو ویو',
    shelter: 'سیکیورٹی: صرف 2 منٹ کی پیدل مسافت پر محفوظ پناہ گاہ',
    guaranteeTitle: 'اوپر کے ہمارے رہائشی معیار',
    g1: 'آمد ہی کے دن رہائش کا قبضہ — مینیجر آپ کا استقبال کرے گا',
    g2: 'جدید ڈیزائن، صاف چادریں اور کچن کا تمام سامان موجود',
    g3: 'قانونی لیز کا معاہدہ آرگنائزیشن فیس میں پوری طرح شامل ہے',
    g4: 'پہلے مہینے کے بجلی اور گیس کے بلز مکمل طور پر پیڈ ہیں',
    btnBook: 'اس یونٹ کی بکنگ کی درخواست بھیجیں',
    zoomHint: 'بڑا کرنے کے لیے تصویر پر کلک کریں',
  },
  AR: {
    sectionTitle: 'ضمان السكن المعتمد',
    sectionSubtitle: 'نماذج الشقق السكنية الجاهزة',
    desc: 'نحن نوفر شققاً سكنية مفروشة ومجهزة بالكامل في أكثر المناطق الوسطى والغربية أماناً واستقراراً في أوكرانيا. جميع المواقع تمر بفحص دقيق لضمان الأمان والراحة.',
    badge: 'صندوق الوحدات السكنية',
    amenities: 'مزايا وتجهيزات الوحدات',
    status: 'الحالة',
    available: 'متاحة حالياً / جاهزة للحجز الفوري',
    location: 'المنطقة',
    safeRegion: 'المنطقة الآمنة (وسط / غرب أوكرانيا)',
    details: 'التفاصيل:',
    beds: 'الأسرة: 2+ (مرتبة طبية مريحة)',
    wifi: 'الإنترنت: واي فاي فايبر سريعة جداً (حتى 100 ميجابايت/ثانية)',
    appliances: 'الأجهزة الكهربائية: غسالة ملابس، موقد طهي، ثلاجة، ميكروويف',
    shelter: 'الأمان: ملجأ حماية معتمد يبعد أقل من دقيقتين مشياً على الأقدام',
    guaranteeTitle: 'معايير الإسكان المعتمدة لدينا',
    g1: 'الاستلام في نفس يوم الوصول — منسق مخصص يستقبلك عند الباب',
    g2: 'تشطيب جودة ممتازة، بياضات أسرة نظيفة، وتجهيزات مطبخ كاملة',
    g3: 'عقد الإيجار القانوني مغطى بالكامل ضمن رسوم التسجيل المشتركة',
    g4: 'فواتير المنافع العامة (الكهرباء والمياه غطيت بالكامل للشهر الأول)',
    btnBook: 'طلب حجز هذه الوحدة السكنية',
    zoomHint: 'انقر على الصورة لتكبيرها',
  }
};

const APARTMENTS = [
  { 
    id: 1, 
    image: apartment1, 
    title: { 
      RU: 'Светлые апартаменты «Уют-1»', 
      UA: 'Світлі апартаменти «Затишок-1»', 
      EN: 'Cozy Living "Comfort-1"', 
      HI: 'आरामदायक फ्लैट "सून-1"', 
      UR: 'پرآسائش ڈیزائن "سکون-1"', 
      AR: 'شقة الراحة والمودة "كوزي-1"' 
    } 
  },
  { 
    id: 2, 
    image: apartment2, 
    title: { 
      RU: 'Современный лофт «Панорама»', 
      UA: 'Сучасний лофт «Панорама»', 
      EN: 'Modern Vista "Panorama"', 
      HI: 'आधुनिक फ्लैट "पैनोरमा"', 
      UR: 'ماڈرن ویو "پینورما"', 
      AR: 'شقة طراز لوفت "بانوراما"' 
    } 
  },
  { 
    id: 3, 
    image: apartment3, 
    title: { 
      RU: 'Компакт-студия «Стиль»', 
      UA: 'Компакт-студія «Стиль»', 
      EN: 'Sleek Studio "Style"', 
      HI: 'स्टाइलिश स्टूडियो "शैली"', 
      UR: 'سٹائلش اسٹوڈیو "سٹائل"', 
      AR: 'استوديو التصميم الأنيق "ستايل"' 
    } 
  },
  { 
    id: 4, 
    image: apartment4, 
    title: { 
      RU: 'Апартаменты бизнес «Комфорт»', 
      UA: 'Апартаменти бізнес «Комфорт»', 
      EN: 'Premium Suite "Comfort"', 
      HI: 'प्रीमियम सुइट "कंफर्ट"', 
      UR: 'پریمیم سویٹ "کمفرٹ"', 
      AR: 'شقة فئة رجال الأعمال "بريميوم"' 
    } 
  },
  { 
    id: 5, 
    image: apartment5, 
    title: { 
      RU: 'Скандинавский интерьер «Нордик»', 
      UA: 'Скандинавський інтер\'єр «Нордік»', 
      EN: 'Nordic Calm "Minimalist"', 
      HI: 'स्कैंडिनेवياई फ्लैट "नॉर्डिक"', 
      UR: 'نورڈک ڈیزائن "نورڈک"', 
      AR: 'الشقة الاسكندنافية "نورديك"' 
    } 
  },
  { 
    id: 6, 
    image: apartment6, 
    title: { 
      RU: 'Семейная резиденция «Грин»', 
      UA: 'Сімейна резиденція «Грін»', 
      EN: 'Family Haven "Green"', 
      HI: 'पारिवारिक फ्लैट "ग्रीन"', 
      UR: 'فیملی ہیون "گرین"', 
      AR: 'شقة العائلة المستقلة "جرين"' 
    } 
  },
];

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('RU');
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeApartment, setActiveApartment] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const isRtl = t.dir === 'rtl';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document body and HTML directional settings when language changes
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang.toLowerCase();
  }, [lang, t.dir]);

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const telegramUrl = 'https://t.me/migration_organization';
  const paymentUrl = 'https://t.me/send?start=IVOsys3eEqbV';

  return (
    <div 
      className="min-h-screen text-slate-800 antialiased font-sans flex flex-col transition-all duration-300 relative"
      style={{
        background: 'radial-gradient(circle at 100% 0%, #e0f2fe 35%, #f8fafc 70%), radial-gradient(circle at 0% 100%, #fef9c3 35%, #f8fafc 70%)',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Top Banner / Announcement bar */}
      <div className="bg-brand-blue text-white text-xs py-2 px-4 font-medium select-none shadow-sm border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center font-display tracking-wide">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-brand-yellow animate-pulse"></span>
            <span>{
              lang === 'RU' 
                ? 'Официальный информационный портал переезда' 
                : lang === 'UA'
                ? 'Офіційний інформаційний портал переїзду'
                : 'Official Relocation & Support Portal'
            }</span>
          </div>
          <span className="text-brand-yellow font-bold text-[11px] sm:text-xs">
            {
              lang === 'RU' 
                ? 'Выплаты и жилье гарантированы договором' 
                : lang === 'UA'
                ? 'Виплати та житло гарантовані договором'
                : 'Support and housing guaranteed under core contract'
            }
          </span>
        </div>
      </div>

      {/* Header component */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 w-full glass-header ${
          scrolled 
            ? 'shadow-md py-3' 
            : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-blue-800 text-white shadow-md shadow-brand-blue/20">
              <span className="font-extrabold text-lg text-brand-yellow font-display group-hover:scale-110 transition-transform">UA</span>
              <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-brand-yellow border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-brand-blue" />
              </div>
            </div>
            <div className="flex flex-col text-start">
              <span className="font-extrabold text-base tracking-wider text-brand-blue uppercase font-display select-none">
                {t.header.logo}
              </span>
              <span className="text-[9.5px] font-semibold text-slate-500 tracking-tight leading-none">
                {t.header.tagline}
              </span>
            </div>
          </a>

          {/* Languages Selector + Telegram Quick CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Switch Capsule */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200 shadow-inner">
              <div className="p-1 px-1.5 text-slate-400 hidden lg:inline-block">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-0.5">
                {(['RU', 'UA', 'EN', 'HI', 'UR', 'AR'] as LanguageCode[]).map((langCode) => {
                  const isActive = lang === langCode;
                  return (
                    <button
                      key={langCode}
                      onClick={() => setLang(langCode)}
                      id={`lang-btn-${langCode.toLowerCase()}`}
                      className={`text-xs font-bold px-2 md:px-3 py-1.5 rounded-xl transition-all duration-300 select-none cursor-pointer ${
                        isActive 
                          ? 'bg-brand-blue text-white shadow-sm scale-105' 
                          : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                      }`}
                    >
                      {langCode}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Header Contact Button */}
            <a 
              href={telegramUrl}
              target="_blank"
              rel="referrer noreferrer"
              id="header-telegram-cta"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl py-2 px-3 sm:px-4 text-xs font-bold transition-all duration-300 shadow-md shadow-brand-blue/15 flex items-center gap-2 shrink-0 cursor-pointer hover:shadow-brand-blue/25 hover:translate-y-[-1px]"
            >
              <Send className="w-3.5 h-3.5 shrink-0 rotate-[-5deg]" />
              <span className="hidden md:inline">{t.header.contactBtn}</span>
              <span className="md:hidden">Telegram</span>
            </a>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">

        {/* Hero Section Container */}
        <section className="relative overflow-hidden border-b border-slate-200/70 pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white/20 backdrop-blur-xs">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Left Content Text details */}
              <div className="lg:col-span-7 text-start flex flex-col justify-center">
                
                {/* Micro announcement badge */}
                <span className="inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold tracking-wide mb-6 border border-brand-blue/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                  </span>
                  {t.hero.badge}
                </span>

                {/* Main Action Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-display mb-6 leading-[1.1] text-balance">
                  {t.hero.title}
                </h1>

                {/* Subtitle description */}
                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
                  {t.hero.subtitle}
                </p>

                {/* Action buttons pair */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                  <a
                    href="#product-package-section"
                    id="hero-scroll-to-package-cta"
                    className="bg-brand-blue hover:bg-brand-blue-dark text-white text-center font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2 hover:shadow-brand-blue/40 cursor-pointer active:scale-98 text-base"
                  >
                    <span>{t.hero.ctaBtn}</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="referrer noreferrer"
                    id="hero-telegram-direct"
                    className="border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-4 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer text-base"
                  >
                    <Send className="w-4.5 h-4.5 text-brand-blue shrink-0" />
                    <span>{t.footer.telegramUsername}</span>
                  </a>
                </div>

                {/* Subtext info */}
                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.hero.ctaSubtext}</span>
                </div>

              </div>

              {/* Hero Right Interactive Mockup Showcase */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="relative mx-auto w-full max-w-md">
                  {/* Backdrop glowing decorations */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-yellow opacity-15 blur-xl group-hover:opacity-20 transition duration-1000"></div>
                  
                  {/* Interactive Status card container */}
                  <div className="relative glass-card rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center justify-between border-b border-slate-100/60 pb-4 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold">REGIONAL_CORE_SYS</span>
                      </div>
                      <span className="text-xs font-mono font-bold bg-white/50 text-slate-600 py-1 px-2.5 rounded-lg border border-slate-200/50">
                        UTC-2026
                      </span>
                    </div>

                    {/* Display of metrics in card */}
                    <div className="space-y-6">
                      
                      {/* Metric 1 */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl glass-step">
                        <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue shrink-0">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col text-start">
                          <span className="text-slate-900 font-extrabold text-xl font-display">{t.hero.metrics.housing}</span>
                          <span className="text-slate-500 text-xs font-medium">{t.hero.metrics.housingLabel}</span>
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl glass-step">
                        <div className="p-3 bg-brand-yellow/10 rounded-xl text-amber-700 shrink-0">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col text-start">
                          <span className="text-slate-900 font-extrabold text-xl font-display">{t.hero.metrics.finances}</span>
                          <span className="text-slate-500 text-xs font-medium">{t.hero.metrics.financesLabel}</span>
                        </div>
                      </div>

                      {/* Metric 3 */}
                      <div className="flex items-start gap-4 p-4 rounded-2xl glass-step">
                        <div className="p-3 bg-slate-200/60 rounded-xl text-slate-700 shrink-0">
                          <FileCheck className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col text-start">
                          <span className="text-slate-900 font-extrabold text-xl font-display">{t.hero.metrics.success}</span>
                          <span className="text-slate-500 text-xs font-medium">{t.hero.metrics.successLabel}</span>
                        </div>
                      </div>

                    </div>

                    {/* Safety badge sticker */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4 text-xs">
                      <span className="text-slate-400 font-medium">🛡️ Secure SSL Layer</span>
                      <span className="text-brand-blue font-bold tracking-tight">Verified Relocator Agency</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Product / Base Package Section */}
        <section id="product-package-section" className="py-16 sm:py-24 bg-white/10 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section description */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <h2 className="text-xs font-extrabold text-brand-blue tracking-widest uppercase font-display mb-3 bg-brand-blue/5 inline-block py-1 px-3 rounded-full">
                {t.package.sectionTitle}
              </h2>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-2 mb-4 leading-normal">
                {
                  lang === 'RU' 
                    ? 'Профессиональный старт вашей новой жизни' 
                    : lang === 'UA'
                    ? 'Професійний старт вашого нового життя'
                    : 'Professional start of your new journey'
                }
              </p>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                {t.package.sectionSubtitle}
              </p>
            </div>

            {/* Core Product Grid (Card + Stepper) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Product Card component (Lefthand/Righthand column) - Centerpiece package */}
              <div className="lg:col-span-6 relative glass-card-dark text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden">
                {/* Blue-Yellow Ambient glows on corners */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
                
                {/* Card Header section */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="flex flex-col text-start">
                    <span className="inline-flex self-start text-[10.5px] font-bold text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20 py-1 px-2.5 rounded-full mb-2 uppercase tracking-wide">
                      {t.package.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight font-display text-white">
                      {t.package.title}
                    </h3>
                  </div>
                  
                  {/* Price sticker badge */}
                  <div className="flex flex-col text-end">
                    <span className="text-3xl sm:text-4xl font-black text-brand-yellow font-display tracking-tight leading-none">
                      {t.package.price}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tight font-mono">
                      {
                        lang === 'RU' 
                          ? 'Все включено' 
                          : lang === 'UA'
                          ? 'Усе включено'
                          : 'All inclusive'
                      }
                    </span>
                  </div>
                </div>

                {/* Subtext info for price */}
                <p className="text-xs text-slate-400 font-mono text-start mb-8 italic">
                  * {t.package.priceSub}
                </p>

                {/* Feature Bulletins */}
                <div className="relative z-10 space-y-4 mb-8 text-start">
                  <h4 className="text-slate-300 font-bold text-sm tracking-wide uppercase mb-3 text-[11.5px]">
                    {t.package.featuresTitle}
                  </h4>
                  
                  {t.package.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-200">
                      <div className="p-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow mt-0.5 shrink-0 border border-brand-yellow/20">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      </div>
                      <span className="text-sm leading-relaxed font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Large Buy CTA */}
                <div className="relative z-10 mt-8">
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="referrer noreferrer"
                    id="package-purchase-telegram-cta"
                    className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-slate-900 text-center font-extrabold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-brand-yellow/15 flex items-center justify-center gap-3.5 hover:shadow-brand-yellow/35 cursor-pointer text-base uppercase tracking-wider relative group"
                  >
                    <Send className="w-5 h-5 shrink-0 rotate-[-5deg] group-hover:translate-x-1 group-hover:translate-y-[-2px] transition-transform" />
                    <span>{t.package.ctaBtn}</span>
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white min-w-4 h-4 text-[9px] font-bold rounded-full px-1.5 flex items-center justify-center animate-bounce shadow-md">
                      NEW
                    </span>
                  </a>
                  
                  <span className="block text-center text-slate-400 text-xs mt-3">
                    {t.package.ctaSub} : <strong className="text-brand-yellow font-mono">{t.footer.telegramUsername}</strong>
                  </span>
                </div>

              </div>

              {/* Stepper block: How it Works */}
              <div className="lg:col-span-6 text-start flex flex-col justify-between self-stretch">
                
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {
                      lang === 'RU' 
                        ? 'ПОШАГОВЫЙ ПРОЦЕСС' 
                        : lang === 'UA'
                        ? 'ПОКРОКОВИЙ ПРОЦЕС'
                        : 'STEP-BY-STEP PROCESS'
                    }
                  </h3>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
                    {t.package.howItWorksTitle}
                  </h4>
                  <div className="h-1.5 w-16 bg-brand-blue rounded-full"></div>
                </div>

                {/* Stepper Steps mapped */}
                <div className="space-y-6 sm:space-y-8 my-4">
                  {t.package.howItWorks.map((item, idx) => {
                    const isFirst = idx === 0;
                    const isSecond = idx === 1;
                    const isThird = idx === 2;
                    
                    return (
                      <div key={idx} className="flex gap-4 sm:gap-6 relative group">
                        
                        {/* Vertical line connector between step pills */}
                        {idx < 2 && (
                          <div 
                            className={`absolute ${isRtl ? 'right-7' : 'left-7'} top-14 bottom-[-24px] w-0.5 bg-slate-200/80 group-hover:bg-brand-blue/30 transition-colors`}
                          ></div>
                        )}
                        
                        {/* Step Pill */}
                        <div className="relative shrink-0 w-14 h-14 rounded-2xl glass-step group-hover:bg-white/70 flex flex-col items-center justify-center transition-all duration-300">
                          <span className={`text-[10px] uppercase font-bold tracking-tight leading-none ${isFirst ? 'text-brand-blue' : isSecond ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {item.step.split(' ')[0]}
                          </span>
                          <span className="text-lg font-black tracking-tight leading-normal text-slate-800">
                            {item.step.split(' ')[1] || (idx + 1)}
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div className="flex flex-col text-start pt-1.5">
                          <h5 className="font-extrabold text-slate-900 text-lg font-display tracking-tight mb-1 group-hover:text-brand-blue transition-colors">
                            {item.title}
                          </h5>
                          <p className="text-sm font-light text-slate-500 leading-relaxed max-w-lg">
                            {item.desc}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Summary helper text */}
                <div className="p-4 rounded-2xl glass-step mt-4 flex items-start gap-3 shadow-xs">
                  <ClipboardCheck className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {
                      lang === 'RU' 
                        ? 'Мы строго соблюдаем регламент. Процесс сбора правовых форм начинается немедленно. Срок полной легализации и заселения зависит от гражданства.' 
                        : lang === 'UA'
                        ? 'Ми суворо дотримуємося регламенту. Процес збору юридичних форм починається негайно. Термін повної легалізації та заселення залежить від громадянства.'
                        : 'We rigorously adhere to protocol. Legal forms preparations launch immediately. Housing booking and legal integration are scheduled instantly based on passport eligibility.'
                    }
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Housing / Apartments Showcase Gallery Section */}
        <section id="housing-showcase-section" className="py-16 sm:py-24 bg-white/20 backdrop-blur-xs border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/10 border border-brand-blue/25 text-brand-blue text-xs font-bold rounded-full uppercase tracking-widest font-display mb-3">
                <Building2 className="w-3.5 h-3.5" />
                {HOUSING_TRANSLATIONS[lang].badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {HOUSING_TRANSLATIONS[lang].sectionSubtitle}
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
                {HOUSING_TRANSLATIONS[lang].desc}
              </p>
            </div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Image Slider/Showcase */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Active Image Box */}
                <div className="relative group overflow-hidden rounded-3xl bg-slate-100 shadow-lg border border-slate-200/60 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                  <img
                    src={APARTMENTS[activeApartment].image}
                    alt={APARTMENTS[activeApartment].title[lang]}
                    referrerPolicy="no-referrer"
                    onClick={() => setLightboxImage(APARTMENTS[activeApartment].image)}
                    className="w-full h-full object-cover select-none cursor-zoom-in group-hover:scale-102 transition-transform duration-700"
                  />
                  
                  {/* Image Details overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-start">
                      <span className="text-brand-yellow font-bold text-xs uppercase tracking-wider font-mono bg-brand-yellow/10 border border-brand-yellow/20 py-0.5 px-2 rounded-md mb-2 inline-block">
                        {HOUSING_TRANSLATIONS[lang].badge} #{activeApartment + 1}
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold font-display">
                        {APARTMENTS[activeApartment].title[lang]}
                      </h4>
                    </div>
                    <button
                      onClick={() => setLightboxImage(APARTMENTS[activeApartment].image)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl p-2.5 text-white/90 hover:text-white flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold transition-all border border-white/10 cursor-pointer active:scale-95"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>{HOUSING_TRANSLATIONS[lang].zoomHint}</span>
                    </button>
                  </div>

                  {/* Left & Right quick slider arrows */}
                  <button
                    onClick={() => setActiveApartment((prev) => (prev === 0 ? APARTMENTS.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md z-10 transition-all hover:scale-110 active:scale-90 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveApartment((prev) => (prev === APARTMENTS.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md z-10 transition-all hover:scale-110 active:scale-90 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {APARTMENTS.map((apartment, idx) => {
                    const isActive = idx === activeApartment;
                    return (
                      <button
                        key={apartment.id}
                        onClick={() => setActiveApartment(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-[4/3] border bg-slate-100 transition-all cursor-pointer ${
                          isActive 
                            ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-102 shadow-md' 
                            : 'border-slate-200 hover:border-slate-400 saturate-75 hover:saturate-100'
                        }`}
                      >
                        <img 
                          src={apartment.image} 
                          alt={apartment.title[lang]} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none"
                        />
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Right Column: Spec card & Guarantees */}
              <div className="lg:col-span-4 space-y-6 text-start">
                
                {/* Specs Card */}
                <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {HOUSING_TRANSLATIONS[lang].amenities}
                  </h3>
                  
                  {/* Status badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-sm">
                    <span className="text-slate-500 font-medium">{HOUSING_TRANSLATIONS[lang].status}:</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 font-mono text-xs bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      {HOUSING_TRANSLATIONS[lang].available}
                    </span>
                  </div>

                  {/* Location badge */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-sm">
                    <span className="text-slate-500 font-medium">{HOUSING_TRANSLATIONS[lang].location}:</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {HOUSING_TRANSLATIONS[lang].safeRegion}
                    </span>
                  </div>

                  {/* Amenities Bullets */}
                  <div className="space-y-4 pt-1">
                    
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-brand-blue/10 rounded-lg text-brand-blue mt-0.5 shrink-0">
                        <Bed className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 leading-tight">{HOUSING_TRANSLATIONS[lang].beds}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-brand-blue/10 rounded-lg text-brand-blue mt-0.5 shrink-0">
                        <Wifi className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 leading-tight">{HOUSING_TRANSLATIONS[lang].wifi}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-brand-blue/10 rounded-lg text-brand-blue mt-0.5 shrink-0">
                        <Tv className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 leading-tight">{HOUSING_TRANSLATIONS[lang].appliances}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-brand-blue/10 rounded-lg text-brand-blue mt-0.5 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-600 leading-tight">{HOUSING_TRANSLATIONS[lang].shelter}</span>
                    </div>

                  </div>

                  {/* Quick telegram reservation trigger */}
                  <div className="mt-8">
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="referrer noreferrer"
                      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl py-3 px-4 font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Send className="w-3.5 h-3.5 rotate-[-5deg]" />
                      <span>{HOUSING_TRANSLATIONS[lang].btnBook}</span>
                    </a>
                  </div>

                </div>

                {/* Housing Standards Section */}
                <div className="p-5 sm:p-6 bg-amber-500/5 rounded-3xl border border-amber-500/10">
                  <h4 className="font-extrabold text-amber-800 text-sm tracking-wide uppercase mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-600" />
                    {HOUSING_TRANSLATIONS[lang].guaranteeTitle}
                  </h4>
                  <ul className="space-y-3">
                    {[
                      HOUSING_TRANSLATIONS[lang].g1,
                      HOUSING_TRANSLATIONS[lang].g2,
                      HOUSING_TRANSLATIONS[lang].g3,
                      HOUSING_TRANSLATIONS[lang].g4,
                    ].map((g, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-slate-600 leading-relaxed font-light items-start">
                        <span className="text-amber-600 font-bold text-sm leading-none">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Lightbox / Image Enlargement Modal Dialog */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-6 right-6 text-white/75 hover:text-white p-2 text-2xl font-bold cursor-pointer"
              >
                ✕
              </button>
              
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                src={lightboxImage}
                alt="Enlarged gallery preview"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl select-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Block with Money Back Guarantee details */}
        <section className="py-16 sm:py-20 bg-white/10 border-t border-b border-slate-200/40 relative overflow-hidden backdrop-blur-xs">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Guarantee Shield Column */}
              <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 md:p-10 text-start relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-emerald-500/15 text-emerald-600 rounded-bl-3xl">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mb-4 flex items-center gap-2 tracking-tight">
                  <span className="text-emerald-500 text-xl font-bold">✓</span>
                  {t.trust.guaranteeTitle}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {t.trust.guaranteeDesc}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 border-t border-slate-100 text-slate-500 text-xs font-semibold">
                  <span>✓ {
                    lang === 'RU' 
                      ? 'Полный аудит сделки' 
                      : lang === 'UA'
                      ? 'Повний аудит угоди'
                      : 'Full audit guarantee'
                  }</span>
                  <span>✓ {
                    lang === 'RU' 
                      ? 'Без комиссий и скрытых платежей' 
                      : lang === 'UA'
                      ? 'Без комісій та прихованих платежів'
                      : 'No hidden fees'
                  }</span>
                  <span>✓ {
                    lang === 'RU' 
                      ? 'Поддержка 24/7' 
                      : lang === 'UA'
                      ? 'Підтримка 24/7'
                      : 'Round-the-clock support'
                  }</span>
                </div>
              </div>

              {/* Secure Payments Mastercard Visa design card */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch text-center lg:text-start justify-center">
                <h4 className="text-sm font-extrabold text-slate-500 tracking-widest uppercase mb-2">
                  {t.trust.securePayment}
                </h4>
                <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto lg:mx-0">
                  {t.trust.verifiedLabel}
                </p>

                {/* Interactive Payment Logos Grid inside responsive box */}
                <div className="glass-card rounded-3xl p-6 flex items-center justify-around gap-6 select-none max-w-md mx-auto w-full">
                  
                  {/* Mastercard vector */}
                  <div className="flex flex-col items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
                    <svg className="w-16 h-10" viewBox="0 0 100 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="62" rx="6" fill="#F8FAFC" />
                      <circle cx="38" cy="31" r="21" fill="#EB001B" />
                      <circle cx="62" cy="31" r="21" fill="#F79E1B" fillOpacity="0.85" />
                    </svg>
                    <span className="text-[10px] font-mono font-bold text-slate-500">Mastercard</span>
                  </div>

                  {/* Divider line */}
                  <div className="h-10 w-px bg-slate-200"></div>

                  {/* Visa vector */}
                  <div className="flex flex-col items-center gap-1.5 opacity-85 hover:opacity-100 transition-opacity">
                    <svg className="w-16 h-10" viewBox="0 0 100 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="62" rx="6" fill="#F8FAFC" />
                      <path d="M15 18H20.4L23.8 38H18.4L15 18Z" fill="#1A1F71" />
                      <path d="M49 18H37C34.8 18 33.2 19.4 32.4 21.4L24 41H29.6L30.8 38H39.2L40 41H45L41.4 18H49ZM32.4 34L35 27L37.8 34H32.4Z" fill="#1A1F71" />
                      <path d="M68.4 21.6C66.8 20.8 64.6 20.4 62 20.4C54.8 20.4 51.2 23.4 51.2 27.6C51.2 31.6 55.8 32.4 55.8 34.6C55.8 35.8 54.2 36.6 52.2 36.6C50.2 36.6 48.4 36 47 35.2L45.4 38.4C47.2 39.4 49.6 40 52 40C59.6 40 63.4 36.8 63.4 32.8C63.4 26 56.4 25.6 56.4 23.4C56.4 22.4 57.8 21.8 59.8 21.8C61.8 21.8 63.6 22.2 65 23L68.4 21.6Z" fill="#1A1F71" />
                      <path d="M85 18H79L70 41H75.4L76.6 38H84L84.6 41H90L85 18ZM77.8 34L80.4 27L82.6 34H77.8Z" fill="#1A1F71" />
                    </svg>
                    <span className="text-[10px] font-mono font-bold text-slate-500">Visa Secure</span>
                  </div>

                  {/* Divider line */}
                  <div className="h-10 w-px bg-slate-200"></div>

                  {/* SSL badge */}
                  <div className="flex flex-col items-center gap-1">
                    <Lock className="w-6 h-6 text-emerald-600 mb-1" />
                    <span className="text-[10px] font-mono font-bold text-slate-500">256-BIT SSL</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ - Frequently Asked Questions Accordions */}
        <section className="py-16 sm:py-24 bg-white/15 backdrop-blur-xs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/35 text-amber-800 text-xs font-bold rounded-full uppercase tracking-widest font-display mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                {
                  lang === 'RU' 
                    ? 'Частые Вопросы' 
                    : lang === 'UA'
                    ? 'Часті Запитання'
                    : 'Q&A Desk'
                }
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                {t.faq.title}
              </h2>
              <p className="text-slate-500 text-sm sm:text-base mt-3">
                {t.faq.subtitle}
              </p>
            </div>

            {/* Accordion List items */}
            <div className="space-y-4">
              {t.faq.items.map((item) => {
                const isOpen = activeFaq === item.id;
                return (
                  <div 
                    key={item.id}
                    id={`faq-item-${item.id}`}
                    className={`rounded-2xl transition-all duration-300 overflow-hidden text-start glass-step ${
                      isOpen 
                        ? 'bg-white/80 border-brand-blue/30 shadow-sm scale-[1.01]' 
                        : 'border-transparent hover:bg-white/60'
                    }`}
                  >
                    {/* Header trigger element */}
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start font-bold text-slate-800 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-display tracking-tight leading-snug">
                        {item.question}
                      </span>
                      <div className={`p-1.5 rounded-full ${isOpen ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-500'} transition-all shrink-0`}>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Collapsible Answer container */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed font-light border-t border-slate-100">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Micro FAQ Help CTA */}
            <div className="mt-12 text-center p-6 glass-card rounded-2xl">
              <p className="text-sm text-slate-600 mb-4">
                {
                  lang === 'RU' 
                    ? 'Остались вопросы? Задайте их напрямую нашему дежурному юристу в Telegram.' 
                    : lang === 'UA'
                    ? 'Залишилися питання? Поставте їх безпосередньо нашому черговому юристу в Telegram.'
                    : 'Have details missing? Ask any questions directly to our desk attorney in Telegram.'
                }
              </p>
              <a
                href={telegramUrl}
                target="_blank"
                rel="referrer noreferrer"
                id="faq-help-telegram-cta"
                className="inline-flex items-center gap-2 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue font-bold px-5 py-2.5 rounded-xl transition-all duration-300 text-xs"
              >
                <Send className="w-3.5 h-3.5 rotate-[-5deg]" />
                <span>{
                  lang === 'RU' 
                    ? 'Задать вопрос юристу' 
                    : lang === 'UA'
                    ? 'Поставити питання юристу'
                    : 'Ask our attorney now'
                }</span>
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* Footer component */}
      <footer className="glass-card-dark text-white pt-16 pb-8 border-t border-white/5 relative z-10 rounded-t-3xl mt-12 mx-4 max-w-7xl lg:mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 border-b border-slate-800 pb-12 items-start">
            
            {/* Footer Left Column brand */}
            <div className="md:col-span-5 text-start">
              <div className="flex items-center gap-2.5 mb-4 font-display">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-blue-800 text-white flex items-center justify-center font-black text-sm select-none">
                  UA
                </div>
                <span className="font-black text-lg tracking-wider text-white uppercase select-none">
                  {t.footer.logo}
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
                {t.footer.desc}
              </p>
            </div>

            {/* Footer Center column info */}
            <div className="md:col-span-3 text-start">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
                {
                  lang === 'RU' 
                    ? 'Главные ссылки' 
                    : lang === 'UA'
                    ? 'Головні посилання'
                    : 'Quick links'
                }
              </h4>
              <ul className="space-y-2 text-slate-400 text-sm font-light">
                <li>
                  <a href="#" className="hover:text-brand-yellow transition-colors">
                    {
                      lang === 'RU' 
                        ? 'Главная' 
                        : lang === 'UA'
                        ? 'Головна'
                        : 'Home'
                    }
                  </a>
                </li>
                <li>
                  <a href="#product-package-section" className="hover:text-brand-yellow transition-colors">
                    {
                      lang === 'RU' 
                        ? 'Базовый пакет' 
                        : lang === 'UA'
                        ? 'Базовий пакет'
                        : 'Support options'
                    }
                  </a>
                </li>
                <li>
                  <a href={telegramUrl} target="_blank" rel="referrer noreferrer" className="hover:text-brand-yellow transition-colors">
                    {
                      lang === 'RU' 
                        ? 'Задать вопрос' 
                        : lang === 'UA'
                        ? 'Поставити питання'
                        : 'Inquire support'
                    }
                  </a>
                </li>
              </ul>
            </div>

            {/* Footer Right column contact cards */}
            <div className="md:col-span-4 text-start bg-slate-800/40 p-6 rounded-2xl border border-slate-800/60">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">
                {t.footer.contactUs}
              </h4>
              <a 
                href={telegramUrl}
                target="_blank"
                rel="referrer noreferrer"
                id="footer-telegram-link"
                className="flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="p-3 bg-brand-yellow text-slate-900 rounded-xl group-hover:scale-105 transition-transform">
                  <Send className="w-5 h-5 rotate-[-5deg]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 leading-none">{
                    lang === 'RU' 
                      ? 'Официальный контакт' 
                      : lang === 'UA'
                      ? 'Офіційний контакт'
                      : 'Official channel'
                  }</span>
                  <span className="text-base font-extrabold text-white group-hover:text-brand-yellow transition-colors leading-tight mt-1">
                    {t.footer.telegramUsername}
                  </span>
                </div>
              </a>
              <p className="text-[10px] text-slate-500 mt-4 leading-normal">
                {
                  lang === 'RU' 
                    ? 'Отвечаем в течение 5-15 минут в рабочее время.' 
                    : lang === 'UA'
                    ? 'Відповідаємо протягом 5-15 хвилин у робочий час.'
                    : 'Average feedback time 5-15 mins during active hours.'
                }
              </p>
            </div>

          </div>

          {/* Legal notes guidelines & general warning */}
          <div className="text-start mb-8 text-[11px] text-slate-500 leading-relaxed space-y-3">
            <p>{t.footer.warning}</p>
            <p>
              {
                lang === 'RU' 
                  ? 'Информация на сайте носит справочно-консультационный характер. Для получения персонализированной юридической оценки проконсультируйтесь с куратором.' 
                  : lang === 'UA'
                  ? 'Інформація на сайті має довідково-консультаційний характер. Для отримання персоналізованої юридичної оцінки проконсультуйтеся з куратором.'
                  : 'Content provided is intended for auxiliary coordination purposes. Contact our compliance attorney desk to verify passport country-specific constraints.'
              }
            </p>
          </div>

          {/* Legal status rights and flags info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-slate-400 text-xs">
            <span>{t.footer.rights}</span>
            <div className="flex items-center gap-1.5 opacity-60">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>for a safe legal journey</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Telegram Support Airplane Button */}
      <a
        href={telegramUrl}
        target="_blank"
        rel="referrer noreferrer"
        id="floating-telegram-airplane"
        title={
          lang === 'RU' 
            ? 'Связаться с куратором' 
            : lang === 'UA'
            ? 'Зв\'язатися з куратором'
            : 'Message Relocation Advisor'
        }
        className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-40 bg-brand-blue hover:bg-brand-blue-dark text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-brand-yellow hover:shadow-brand-blue/50 focus:outline-none`}
      >
        <div className="relative">
          <Send className="w-6 h-6 rotate-[-5deg]" />
          {/* Pulsing notification circle sticker */}
          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span>
          </span>
        </div>
      </a>

    </div>
  );
}
