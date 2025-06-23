import React from "react";
import {
  Star, Users, Zap, Shield, TrendingUp, Globe, CheckCircle, ArrowRight, Play, Award, Clock, Target, MessageSquare
} from "lucide-react";

const Link = ({ href, children, className = '', ...props }) => (
  <a href={href} className={className} {...props}>{children}</a>
);
const twMerge = (...classes) => classes.filter(Boolean).join(' ');

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  if (size === "lg") baseClasses = twMerge(baseClasses, "h-11 px-8 py-4");
  else baseClasses = twMerge(baseClasses, "h-9 px-4 py-2");
  if (variant === "ghost") baseClasses = twMerge(baseClasses, "hover:bg-gray-100 hover:text-gray-900");
  else if (variant === "outline") baseClasses = twMerge(baseClasses, "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900");
  else baseClasses = twMerge(baseClasses, "bg-blue-600 text-white shadow hover:bg-blue-700");
  const finalClasses = twMerge(baseClasses, className);
  return <button className={finalClasses} ref={ref} {...props}>{props.children}</button>;
});
Button.displayName = "Button";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("bg-white rounded-2xl shadow-lg", className)} {...props} />
));
Card.displayName = "Card";
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";
const Badge = ({ children, className = "" }) => (
  <span className={twMerge("inline-block rounded-full font-bold", className)}>{children}</span>
);
const Logo = ({ size = "sm", variant }) => {
  const textColorClass = variant === 'white' ? 'text-white' : 'text-blue-600';
  const fontSizeClass = size === 'sm' ? 'text-2xl' : 'text-3xl';
  return <span className={`font-black ${fontSizeClass} ${textColorClass}`}>MyApp</span>;
};
const TrustBadges = ({ variant = "horizontal", showAll = false }) => {
  const badges = [
    { icon: Shield, title: "آمن 100%", description: "حماية كاملة لحسابك", color: "text-green-500" },
    { icon: Star, title: "تقييم 4.9/5", description: "من أكثر من 5000 عميل", color: "text-yellow-500" },
    { icon: CheckCircle, title: "ضمان النتائج", description: "أو استرداد المال", color: "text-blue-500" },
    { icon: Award, title: "الأفضل في المنطقة", description: "جائزة أفضل خدمة 2024", color: "text-purple-500" },
    { icon: Clock, title: "دعم 24/7", description: "فريق متاح دائماً", color: "text-orange-500" },
    { icon: Users, title: "+150,000 عميل", description: "ثقة آلاف العملاء", color: "text-indigo-500" }
  ];
  const displayBadges = showAll ? badges : badges.slice(0, 4);
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayBadges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <Icon className={`h-8 w-8 mx-auto mb-2 ${badge.color}`} />
              <div className="text-white font-bold text-sm">{badge.title}</div>
              <div className="text-white/70 text-xs">{badge.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {displayBadges.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <Icon className={`h-5 w-5 ${badge.color}`} />
            <div>
              <div className="text-white font-semibold text-sm">{badge.title}</div>
              <div className="text-white/70 text-xs">{badge.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function LandingPage() {
  const features = [
    { icon: Zap, title: "سرعة فائقة", description: "تنفيذ الطلبات في ثوانٍ معدودة" },
    { icon: Shield, title: "أمان مضمون", description: "حماية كاملة لحسابك ومعلوماتك" },
    { icon: Users, title: "دعم 24/7", description: "فريق دعم متاح على مدار الساعة" },
    { icon: TrendingUp, title: "نتائج مضمونة", description: "زيادة حقيقية في المتابعين والتفاعل" },
    { icon: Globe, title: "خدمات عالمية", description: "دعم جميع المنصات العالمية والمحلية" },
    { icon: MessageSquare, title: "استشارات مجانية", description: "نقدم لك نصائح تسويقية مجاناً" },
    { icon: Award, title: "جودة عالية", description: "خدماتنا معتمدة وموثوقة من آلاف العملاء" },
    { icon: Star, title: "تقييمات ممتازة", description: "تقييمات إيجابية من مستخدمينا باستمرار" }
  ];
  const stats = [
    { value: "+50M", label: "متابع تم إضافتهم", icon: Users },
    { value: "+2M", label: "طلب مكتمل", icon: CheckCircle },
    { value: "99.9%", label: "معدل النجاح", icon: Target },
    { value: "24/7", label: "دعم فوري", icon: Clock }
  ];
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo size="sm" />
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-700">تسجيل الدخول</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full">إنشاء حساب</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-lg">
              🚀 منصة التسويق الرقمي #1 في المنطقة
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              نمو ذكي لوسائل التواصل الاجتماعي
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              خدمات احترافية لزيادة متابعيك وتفاعلك على جميع منصات التواصل الاجتماعي
              <br />
              بأفضل الأسعار وأعلى جودة في السوق
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 rounded-full shadow-lg text-white"
                >
                  ابدأ الآن مجاناً
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 rounded-full border-2 border-blue-600 text-blue-600 bg-white hover:bg-gray-50"
                >
                  <Play className="ml-2 h-5 w-5" />
                  استكشف الخدمات
                </Button>
              </Link>
            </div>
            {/* Trust Badges */}
            <div className="mt-10">
              <TrustBadges variant="horizontal" showAll />
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              لماذا تختار منصتنا؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أفضل الخدمات والأدوات لنمو حساباتك على وسائل التواصل الاجتماعي
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              ابدأ رحلتك نحو النجاح اليوم
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف العملاء الذين حققوا نجاحاً باهراً مع خدماتنا
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full"
                >
                  ابدأ مجاناً الآن
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 rounded-full border-2"
                >
                  استكشف الخدمات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-right">
            <Logo variant="white" size="sm" />
            <div className="text-gray-400 mt-4 md:mt-0">
              © 2025 جميع الحقوق محفوظة
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              من نحن
            </Link>
            <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
              خدماتنا
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              اتصل بنا
            </Link>
            <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
              الأسئلة الشائعة
            </Link>
            <Link href="/partners" className="text-gray-400 hover:text-white transition-colors">
              شركاؤنا
            </Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
              المدونة
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
              الباقات والأسعار
            </Link>
          </div>
        </div>
      </footer>
      <div className="flex flex-col md:flex-row gap-6 mt-8 justify-center items-center">
        <a href="/services" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg transition-transform duration-200">عرض الخدمات</a>
        <a href="/dashboard" className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-lg font-bold shadow-lg transition-transform duration-200">لوحة التحكم</a>
        <a href="/reports" className="px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-lg font-bold shadow-lg transition-transform duration-200">التقارير</a>
      </div>
    </div>
  );
}

export default LandingPage;
