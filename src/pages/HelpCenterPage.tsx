import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Mail, MessageCircle, FileText, ChevronDown } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function HelpCenterPage() {
  const { t, language } = useLanguage();

  const faqs = [
    {
      q: language === 'ar' ? 'كيف يمكنني استخدام مولد الذكاء الاصطناعي؟' : 'How do I use the AI Generator?',
      a: language === 'ar' 
        ? 'يمكنك الانتقال إلى صفحة "المولد" من القائمة العلوية، ثم كتابة وصف للصورة التي تريدها، وسيقوم الذكاء الاصطناعي بإنشاء برومبت احترافي لك.'
        : 'Navigate to the "Generator" page from the top menu, type a description of the image you want, and our AI will craft a professional prompt for you.'
    },
    {
      q: language === 'ar' ? 'ما هي خطة Pro؟' : 'What is the Pro plan?',
      a: language === 'ar'
        ? 'خطة Pro تمنحك وصولاً غير محدود لجميع البرومبتات، إمكانية توليد عدد غير محدود من البرومبتات يومياً، ودعماً فنياً على مدار الساعة.'
        : 'The Pro plan gives you unlimited access to all prompts, unlimited daily generations, and 24/7 priority support.'
    },
    {
      q: language === 'ar' ? 'هل يمكنني استخدام البرومبتات لأغراض تجارية؟' : 'Can I use the prompts for commercial purposes?',
      a: language === 'ar'
        ? 'نعم، جميع البرومبتات المتوفرة على منصتنا يمكن استخدامها في مشاريعك الشخصية والتجارية دون أي قيود.'
        : 'Yes, all prompts available on our platform can be used for both personal and commercial projects without restrictions.'
    },
    {
      q: language === 'ar' ? 'كيف يمكنني استرجاع أموالي؟' : 'How can I get a refund?',
      a: language === 'ar'
        ? 'نقدم ضمان استرداد الأموال لمدة 14 يوماً. إذا لم تكن راضياً عن الخدمة، يرجى التواصل مع فريق الدعم وسنقوم بإرجاع المبلغ بالكامل.'
        : 'We offer a 14-day money-back guarantee. If you are not satisfied, please contact our support team for a full refund.'
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            {t('helpCenterTitle')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('helpCenterSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن سؤالك هنا...' : 'Search for your question here...'}
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-sm transition-all"
          />
        </motion.div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Card className="p-8 rounded-[2rem] bg-white/5 border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{language === 'ar' ? 'المحادثة المباشرة' : 'Live Chat'}</h3>
            <p className="text-white/60 mb-6">{language === 'ar' ? 'تحدث مع فريقنا مباشرة' : 'Chat with our team directly'}</p>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">{language === 'ar' ? 'ابدأ المحادثة' : 'Start Chat'}</Button>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <Card className="p-8 rounded-[2rem] bg-white/5 border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Support'}</h3>
            <p className="text-white/60 mb-6">{language === 'ar' ? 'أرسل لنا رسالة مفصلة' : 'Send us a detailed message'}</p>
            <a 
              href="mailto:moazbakhrish@gmail.com" 
              className={cn(
                buttonVariants({ variant: "outline" }), 
                "w-full border-white/20 text-white hover:bg-white/10 h-10 flex items-center justify-center rounded-lg"
              )}
            >
              {language === 'ar' ? 'أرسل رسالة' : 'Send Email'}
            </a>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          <Card className="p-8 rounded-[2rem] bg-white/5 border-white/10 backdrop-blur-sm text-center hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{language === 'ar' ? 'الأدلة والشروحات' : 'Guides & Docs'}</h3>
            <p className="text-white/60 mb-6">{language === 'ar' ? 'تصفح مكتبة الشروحات' : 'Browse our documentation'}</p>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">{language === 'ar' ? 'تصفح الأدلة' : 'Browse Docs'}</Button>
          </Card>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">{t('faq')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <details className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-medium">
                  {faq.q}
                  <span className="transition duration-300 group-open:-rotate-180">
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-white/70 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
