import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm"
      role="banner"
    >
      <nav
        className="max-w-container-max mx-auto h-20 flex items-center justify-between px-margin-mobile md:px-margin-desktop"
        role="navigation"
        aria-label="القائمة الرئيسية"
      >
        {/* Logo — RIGHT side in RTL */}
        <Link
          to="/"
          className="font-headline-lg text-headline-lg font-bold text-primary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
          aria-label="الرئيسية SpinesTech"
        >
          SpinesTech
        </Link>

        {/* Navigation Links — CENTER */}
        <div className="hidden lg:flex items-center gap-5">
          <NavLink to="/">الرئيسية</NavLink>
          <NavLink to="/about">من نحن</NavLink>
          <NavLink to="/services">الخدمات</NavLink>
          <NavLink to="/products">المنتجات</NavLink>
          <NavLink to="/sectors">القطاعات</NavLink>
          <NavLink to="/case-studies">دراسات الحالة</NavLink>
          <NavLink to="/careers">الوظائف</NavLink>
          <NavLink to="/contact">تواصل معنا</NavLink>
        </div>

        {/* Actions — LEFT side in RTL */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            className="hidden md:inline text-on-surface-variant cursor-pointer font-body-md hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-2 py-1"
            aria-label="تغيير اللغة إلى الإنجليزية"
          >
            English
          </button>
          <Link
            to="/contact"
            className="bg-primary-container text-on-primary font-bold py-2 px-5 rounded-lg transition-all duration-150 active:opacity-80 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
            aria-label="احجز استشارة مجانية"
          >
            احجز استشارة مجانية
          </Link>
        </div>
      </nav>
    </header>
  );
}

/** Reusable nav link with active/inactive states */
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: "text-secondary font-bold border-b-2 border-secondary pb-1",
      }}
      inactiveProps={{
        className: "text-on-surface-variant hover:text-secondary transition-colors duration-200",
      }}
      className="font-body-md text-body-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
    >
      {children}
    </Link>
  );
}
