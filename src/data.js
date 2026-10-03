import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('mn-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('mn-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
export const tr = (o) => (o && typeof o === 'object' ? o[lang.value] ?? o.ar : o)
export const img = (p) => `/img/${p}`

// من خرائط Google + لوحة المكتب
export const site = {
  whatsapp: '966502123535',
  phone: { tel: '+966502123535', label: '050 212 3535' },
  sign: { tel: '+966582163880', label: '058 216 3880' },
  rating: '4.0', reviews: '1,207',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.75725,46.7190467',
  mapEmbed: 'https://www.google.com/maps?q=24.75725,46.7190467&z=17&output=embed',
}
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const jobs = [
  { id: 'maid', icon: 'M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z', t: { ar: 'عاملة منزلية', en: 'Housemaid' }, d: { ar: 'تنظيف وترتيب ومساعدة يومية في المنزل.', en: 'Cleaning, tidying and daily help at home.' } },
  { id: 'driver', icon: 'M5 16l1.5-5A2 2 0 018.4 9.6h7.2a2 2 0 011.9 1.4L19 16v3h-2v-1H7v1H5zM7.5 15a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z', t: { ar: 'سائق خاص', en: 'Private driver' }, d: { ar: 'لتوصيل العائلة والمشاوير اليومية.', en: 'For family trips and daily errands.' } },
  { id: 'cook', icon: 'M6 13h12v2a5 5 0 01-5 5h-2a5 5 0 01-5-5zM8 10a4 4 0 118 0z', t: { ar: 'طبّاخ / طبّاخة', en: 'Cook' }, d: { ar: 'خبرة بالمطبخ الخليجي أو العالمي.', en: 'Experienced in Gulf or international cuisine.' } },
  { id: 'nanny', icon: 'M12 4a3 3 0 110 6 3 3 0 010-6zm-6 16c0-3.3 2.7-6 6-6s6 2.7 6 6z', t: { ar: 'مربية / جليسة أطفال', en: 'Nanny' }, d: { ar: 'رعاية الأطفال ومتابعة يومهم.', en: 'Childcare and daily routines.' } },
]

// أمثلة شائعة — تُؤكَّد مع المكتب
export const nations = [
  { id: 'ph', t: { ar: 'الفلبين', en: 'Philippines' } },
  { id: 'ke', t: { ar: 'كينيا', en: 'Kenya' } },
  { id: 'ug', t: { ar: 'أوغندا', en: 'Uganda' } },
  { id: 'et', t: { ar: 'إثيوبيا', en: 'Ethiopia' } },
  { id: 'bd', t: { ar: 'بنغلاديش', en: 'Bangladesh' } },
  { id: 'in', t: { ar: 'الهند', en: 'India' } },
  { id: 'lk', t: { ar: 'سريلانكا', en: 'Sri Lanka' } },
  { id: 'any', t: { ar: 'لا يهم — أنصحوني', en: 'Any — advise me' } },
]

export const skills = [
  { id: 'kids', t: { ar: 'رعاية أطفال', en: 'Childcare' } },
  { id: 'elder', t: { ar: 'رعاية كبار السن', en: 'Elderly care' } },
  { id: 'cooking', t: { ar: 'طبخ', en: 'Cooking' } },
  { id: 'arabic', t: { ar: 'تتحدث العربية', en: 'Speaks Arabic' } },
  { id: 'exp', t: { ar: 'خبرة سابقة بالسعودية', en: 'Previous KSA experience' } },
]

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لمكتب مدار النجوم',
    brand: 'مدار النجوم', brandSub: 'للاستقدام', brandEn: 'MADAR ALNOJOM',
    nav: { services: 'الخدمات', request: 'اطلب الآن', journey: 'رحلة الطلب', track: 'تابع طلبك', faq: 'أسئلة', visit: 'المكتب' },
    hero: {
      kicker: 'مكتب استقدام — حي المغرزات، الرياض',
      t1: 'من أول طلب', t2: 'حتى الوصول…', t3: 'كل خطوة واضحة.',
      lead: 'نساعدك تختار العاملة أو السائق المناسب، ونتابع معك الإجراءات عبر منصة مساند — وتقدر تسأل عن حالة طلبك في أي وقت عبر واتساب.',
      cta: 'ابدأ طلبك', track: 'تابع طلبك',
      musaned: 'التعاقد عبر منصة مساند', rate: 'مراجعة على Google',
    },
    services: { kicker: 'الخدمات', title: 'نستقدم لك', note: 'المهن والجنسيات المتاحة تتغير حسب الأنظمة والطلب — نوضح لك المتاح عند التواصل.' },
    req: {
      kicker: 'اطلب الآن', title: 'جهّز طلبك في دقيقة',
      s1: 'المهنة', s2: 'الجنسية المفضّلة', s3: 'مواصفات تهمّك', s4: 'بياناتك',
      name: 'الاسم', phone: 'الجوال', city: 'المدينة', cityDef: 'الرياض',
      send: 'أرسل الطلب عبر واتساب', required: 'الرجاء كتابة الاسم والجوال.',
      summary: 'ملخص طلبك',
      msg: { hello: 'السلام عليكم، أرغب بالاستقدام عن طريق مكتب مدار النجوم', job: 'المهنة', nation: 'الجنسية', skills: 'مواصفات', name: 'الاسم', phone: 'الجوال', city: 'المدينة' },
    },
    journey: {
      kicker: 'رحلة الطلب', title: 'ست محطات… ونحن معك في كل واحدة',
      need: 'المطلوب منك',
      steps: [
        { t: 'الاستشارة', d: 'نسمع احتياجك ونوضح لك المهن والجنسيات المتاحة والمدة المتوقعة لكل جنسية.', n: 'اتصال أو زيارة للمكتب.' },
        { t: 'اختيار السيرة الذاتية', d: 'نعرض عليك السير الذاتية المتاحة لتختار الأنسب لعائلتك.', n: 'مراجعة السير واختيار المرشح/ة.' },
        { t: 'التأشيرة', d: 'إصدار تأشيرة العمالة المنزلية عبر القنوات الرسمية.', n: 'إصدار التأشيرة أو تزويدنا برقمها.' },
        { t: 'التعاقد عبر مساند', d: 'توقيع العقد الموحد والدفع من خلال منصة مساند لضمان حقك.', n: 'تأكيد العقد والسداد في المنصة.' },
        { t: 'إجراءات بلد المصدر', d: 'متابعة الفحص الطبي والإجراءات في بلد العامل/ة حتى صدور التذكرة.', n: 'لا شيء — نحن نتابع ونبلغك بالمستجدات.' },
        { t: 'الوصول والاستلام', d: 'نبلغك بموعد الوصول وترتيبات الاستلام.', n: 'الاستلام في الموعد المحدد.' },
      ],
    },
    track: {
      kicker: 'تابع طلبك', title: 'وين وصل طلبي؟',
      lead: 'أرسل رقم العقد واسمك، ويصلك تحديث حالة الطلب من فريق المتابعة.',
      contract: 'رقم العقد في مساند', name: 'الاسم', send: 'اسأل عن حالة طلبي', required: 'الرجاء كتابة رقم العقد والاسم.',
      msg: 'السلام عليكم، أرغب بمعرفة حالة طلبي', mContract: 'رقم العقد', mName: 'الاسم',
    },
    faq: {
      kicker: 'أسئلة شائعة', title: 'قبل ما تبدأ',
      items: [
        { q: 'كم تستغرق مدة الاستقدام؟', a: 'تختلف حسب الجنسية وإجراءات بلد المصدر. نوضح لك المدة المتوقعة لكل جنسية قبل التعاقد.' },
        { q: 'كيف يتم الدفع؟', a: 'يتم التعاقد والدفع عبر منصة مساند الرسمية، وهذا يحفظ حقوقك وحقوق العامل/ة.' },
        { q: 'ماذا لو لم يناسبني العامل/ة؟', a: 'تسري فترة التجربة والضمان وفق العقد الموحد في منصة مساند، ونساعدك في الإجراءات.' },
        { q: 'هل أقدر أتابع طلبي بعد التعاقد؟', a: 'نعم — أرسل رقم العقد عبر نموذج «تابع طلبك» أو اتصل بالمكتب في أوقات الدوام.' },
      ],
    },
    visit: {
      kicker: 'المكتب', title: 'زورونا في المغرزات',
      addr: 'طريق عثمان بن عفان، حي المغرزات، الرياض',
      hours: [{ d: 'الأحد – الخميس', h: '٩:٠٠ ص – ٥:٠٠ م' }, { d: 'الجمعة – السبت', h: 'مغلق' }],
      dir: 'الاتجاهات', call: 'اتصال', sign: 'رقم اللوحة',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية' },
    sticky: { call: 'اتصال', req: 'اطلب عبر واتساب' },
  },
  en: {
    ribbon: 'Demo preview — prepared for Madar Alnojom',
    brand: 'Madar Alnojom', brandSub: 'Recruitment', brandEn: 'مكتب مدار النجوم للاستقدام',
    nav: { services: 'Services', request: 'Request', journey: 'Journey', track: 'Track', faq: 'FAQ', visit: 'Office' },
    hero: {
      kicker: 'Recruitment office — Al Mughrizat, Riyadh',
      t1: 'From the first request', t2: 'to arrival…', t3: 'every step is clear.',
      lead: 'We help you choose the right housemaid or driver and follow up every procedure through the Musaned platform — and you can ask about your request anytime on WhatsApp.',
      cta: 'Start your request', track: 'Track a request',
      musaned: 'Contracts via Musaned', rate: 'Google reviews',
    },
    services: { kicker: 'Services', title: 'We recruit', note: 'Available professions and nationalities change with regulations and demand — we’ll confirm what’s available when you contact us.' },
    req: {
      kicker: 'Request', title: 'Prepare your request in a minute',
      s1: 'Profession', s2: 'Preferred nationality', s3: 'What matters to you', s4: 'Your details',
      name: 'Name', phone: 'Mobile', city: 'City', cityDef: 'Riyadh',
      send: 'Send request on WhatsApp', required: 'Please enter your name and mobile.',
      summary: 'Your request',
      msg: { hello: 'Hello, I would like to recruit through Madar Alnojom', job: 'Profession', nation: 'Nationality', skills: 'Preferences', name: 'Name', phone: 'Mobile', city: 'City' },
    },
    journey: {
      kicker: 'The journey', title: 'Six stops — and we’re with you at each one',
      need: 'What you do',
      steps: [
        { t: 'Consultation', d: 'We listen to your needs and explain available professions, nationalities and expected timelines.', n: 'Call or visit the office.' },
        { t: 'Choose a CV', d: 'We show you available CVs so you can pick the best fit for your family.', n: 'Review CVs and choose a candidate.' },
        { t: 'Visa', d: 'The domestic worker visa is issued through official channels.', n: 'Issue the visa or share its number.' },
        { t: 'Contract on Musaned', d: 'Sign the unified contract and pay through Musaned to protect your rights.', n: 'Confirm the contract and pay on the platform.' },
        { t: 'Home-country procedures', d: 'We follow medical checks and procedures in the worker’s country until the ticket is issued.', n: 'Nothing — we follow up and keep you posted.' },
        { t: 'Arrival', d: 'We notify you of the arrival date and pick-up arrangements.', n: 'Pick-up on the scheduled date.' },
      ],
    },
    track: {
      kicker: 'Track a request', title: 'Where is my request?',
      lead: 'Send your contract number and name, and the follow-up team will update you on its status.',
      contract: 'Musaned contract no.', name: 'Name', send: 'Ask about my request', required: 'Please enter the contract number and name.',
      msg: 'Hello, I would like to know the status of my request', mContract: 'Contract no.', mName: 'Name',
    },
    faq: {
      kicker: 'FAQ', title: 'Before you start',
      items: [
        { q: 'How long does recruitment take?', a: 'It depends on the nationality and home-country procedures. We’ll give you the expected timeline before you sign.' },
        { q: 'How do I pay?', a: 'Contracts and payments go through the official Musaned platform, which protects both you and the worker.' },
        { q: 'What if it doesn’t work out?', a: 'The probation and guarantee period follow the unified Musaned contract, and we help you with the procedures.' },
        { q: 'Can I follow up after signing?', a: 'Yes — send your contract number through “Track a request” or call the office during working hours.' },
      ],
    },
    visit: {
      kicker: 'Office', title: 'Visit us in Al Mughrizat',
      addr: 'Othman Bin Affan Rd., Al Mughrizat, Riyadh',
      hours: [{ d: 'Sunday – Thursday', h: '9:00 AM – 5:00 PM' }, { d: 'Friday – Saturday', h: 'Closed' }],
      dir: 'Directions', call: 'Call', sign: 'Sign number',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview' },
    sticky: { call: 'Call', req: 'Request on WhatsApp' },
  },
}
export const t = computed(() => dict[lang.value])
