/* Glloria Design Direction: Warm Editorial Atelier — RTL shell, quiet utility labels, fired-clay accents, and editorial navigation. */
import { useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowUpLeft, Instagram, Menu, X } from "lucide-react";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "الأعمال", href: "/projects" },
  { label: "عن هبة", href: "/#about" },
  { label: "الخدمات", href: "/#services" },
  { label: "الحجز", href: "/booking" },
  { label: "آراء العملاء", href: "/#testimonials" },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open}>
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)} aria-label="Glloria الرئيسية">
          <span className="brand-mark" aria-hidden="true"><img src="/manus-storage/glloria-logo_c03b6188.png" alt="" /></span>
          <span className="brand-name">Glloria</span>
          <span className="brand-sub">INTERIORS / STUDIO</span>
        </Link>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="التنقل الرئيسي">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${location === item.href ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link href="/booking" className="nav-cta" onClick={() => setOpen(false)}>
            ابدئي الحكاية <ArrowUpLeft size={15} strokeWidth={1.5} />
          </Link>
        </nav>
        <div className="header-note">قنا، مصر <span>·</span> 2024—</div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-topline" />
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">Glloria<span>®</span></Link>
          <p className="footer-statement">مساحات تُشبه أصحابها،<br />وتعيش معهم طويلاً.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">تواصلي معنا</span>
          <a href="https://wa.me/201000000000" target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a href="mailto:hello@glloria.studio">hello@glloria.studio</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">تابعينا</span>
          <a href="https://www.facebook.com/glloriaaa" target="_blank" rel="noreferrer">Facebook ↗</a>
          <a href="https://www.instagram.com/glloriaaa" target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram ↗</a>
        </div>
        <div className="footer-end">
          <span>GLL / 01</span>
          <span>© 2024 Glloria Studio</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell" dir="rtl">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <a className="whatsapp-float" href="https://wa.me/201000000000" target="_blank" rel="noreferrer" aria-label="تواصلي مع Glloria على واتساب">
        <span>واتساب</span><ArrowUpLeft size={17} strokeWidth={1.5} />
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={ProjectDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/booking" component={Booking} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}
