import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer
      className="w-full pt-16 pb-8 px-margin-mobile md:px-margin-desktop flex flex-col items-center rtl bg-primary-container text-on-primary"
      role="contentinfo"
      aria-label="تذييل الصفحة"
    >
      <div className="max-w-container-max w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-right">
        <div className="md:col-span-1">
          <span className="font-headline-xl text-headline-xl font-bold text-on-primary mb-6 block">
            <Link
              to="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
            >
              SpinesTech
            </Link>
          </span>
          <p className="font-body-md text-on-surface-variant opacity-80 leading-relaxed">
            شريكك الاستراتيجي في التحول الرقمي. نصمم المستقبل بأيدي خبراء سعوديين وعالميين.
          </p>
          <div className="flex gap-4 mt-8 justify-start">
            <a
              className="text-outline-variant hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
              href="#"
              aria-label="موقعنا الإلكتروني العالمي"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                public
              </span>
            </a>
            <a
              className="text-outline-variant hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
              href="#"
              aria-label="تواصل معنا عبر البريد الإلكتروني"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                alternate_email
              </span>
            </a>
            <a
              className="text-outline-variant hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
              href="#"
              aria-label="مشاركة الصفحة"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                share
              </span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm mb-6 text-on-primary font-bold">
            الخدمات
          </h4>
          <ul className="space-y-4 font-body-md text-outline-variant">
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                تطوير البرمجيات
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/products"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                أنظمة ERP
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                الذكاء الاصطناعي
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                استشارات تقنية
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm mb-6 text-on-primary font-bold">
            الشركة
          </h4>
          <ul className="space-y-4 font-body-md text-outline-variant">
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/about"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                من نحن
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/sectors"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                القطاعات
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/products"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                المنتجات
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/careers"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                وظائف
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm mb-6 text-on-primary font-bold">
            تواصل معنا
          </h4>
          <ul className="space-y-4 font-body-md text-outline-variant" aria-label="تفاصيل الاتصال">
            <li className="flex items-center gap-2 justify-start">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                location_on
              </span>
              <span>الرياض، المملكة العربية السعودية</span>
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                mail
              </span>
              <span>contact@spinestech.com</span>
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                phone_iphone
              </span>
              <span>+966 000 000 000</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full border-t border-outline-variant/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-outline-variant font-caption">
        <p>© ٢٠٢٤ SpinesTech. جميع الحقوق محفوظة</p>
        <div className="flex gap-6">
          <a
            className="hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
            href="#"
          >
            سياسة الخصوصية
          </a>
          <a
            className="hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
            href="#"
          >
            شروط الاستخدام
          </a>
        </div>
      </div>
    </footer>
  );
}
