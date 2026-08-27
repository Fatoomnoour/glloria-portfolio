/* Glloria Design Direction: Warm Editorial Atelier — bilingual shell, quiet utility labels, fired-clay accents, and editorial navigation. */
import { Link, Route, Switch, useLocation } from "wouter";
import {
  ArrowUpLeft,
  Globe2,
  Instagram,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { LocaleProvider, useLocale } from "./contexts/LocaleContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { GLLORIA_CONFIRMATION_WHATSAPP_NUMBER } from "../../shared/whatsapp";
import RevealObserver from "./components/RevealObserver";

const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Admin = lazy(() => import("./pages/Admin"));
const navItems = [
  { key: "nav.home", href: "/" },
  { key: "nav.projects", href: "/projects" },
  { key: "nav.about", href: "/#about" },
  { key: "nav.services", href: "/#services" },
  { key: "nav.booking", href: "/booking" },
  { key: "nav.testimonials", href: "/#testimonials" },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { t, toggleLocale, locale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
        >
          {open ? (
            <X size={22} strokeWidth={1.5} />
          ) : (
            <Menu size={22} strokeWidth={1.5} />
          )}
        </button>
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/manus-storage/glloria-logo_c03b6188.png" alt="" />
          </span>
          <span className="brand-name">Glloria</span>
          <span className="brand-sub">INTERIORS / STUDIO</span>
        </Link>
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={location === item.href ? "is-active" : ""}
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </a>
          ))}
          <Link
            href="/booking"
            className="nav-cta"
            onClick={() => setOpen(false)}
          >
            {t("nav.primary")} <ArrowUpLeft size={15} strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            className="language-toggle"
            onClick={toggleLocale}
          >
            <Globe2 size={14} /> {t("nav.language")}
            <span>{locale.toUpperCase()}</span>
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => toggleTheme?.()}
            aria-label={
              isDark
                ? locale === "ar"
                  ? "التبديل إلى الوضع الفاتح"
                  : "Switch to light mode"
                : locale === "ar"
                  ? "التبديل إلى الوضع الداكن"
                  : "Switch to dark mode"
            }
            title={
              isDark
                ? locale === "ar"
                  ? "الوضع الفاتح"
                  : "Light mode"
                : locale === "ar"
                  ? "الوضع الداكن"
                  : "Dark mode"
            }
          >
            <span aria-hidden="true">
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </span>
            <span className="theme-toggle-label">
              {isDark
                ? locale === "ar"
                  ? "فاتح"
                  : "Light"
                : locale === "ar"
                  ? "داكن"
                  : "Dark"}
            </span>
          </button>
        </nav>
        <div className="header-note">
          {locale === "ar" ? "قنا، مصر" : "Qena, Egypt"} <span>·</span> 2024—
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-topline" />
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            Glloria<span>®</span>
          </Link>
          <p className="footer-statement">
            {t("footer.statement")
              .split("\n")
              .map(line => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
          </p>
        </div>
        <div className="footer-column">
          <span className="footer-label">{t("footer.contact")}</span>
          <a
            href={`https://wa.me/${GLLORIA_CONFIRMATION_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp ↗
          </a>
          <a href="mailto:hello@glloria.studio">hello@glloria.studio</a>
        </div>
        <div className="footer-column">
          <span className="footer-label">{t("footer.follow")}</span>
          <a
            href="https://www.facebook.com/glloriaaa"
            target="_blank"
            rel="noreferrer"
          >
            Facebook ↗
          </a>
          <a
            href="https://www.instagram.com/glloriaaa"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={14} /> Instagram ↗
          </a>
        </div>
        <div className="footer-column footer-legal">
          <span className="footer-label">{t("footer.legal") || "Legal"}</span>
          <Link href="/privacy">{t("footer.privacy") || "Privacy"}</Link>
          <Link href="/terms">{t("footer.terms") || "Terms"}</Link>
        </div>
        <div className="footer-end">
          <span>GLL / 01</span>
          <span>© {currentYear} Glloria Studio</span>
        </div>
      </div>
    </footer>
  );
}

function MobileConversionBar() {
  const { locale, t } = useLocale();
  return (
    <nav
      className="mobile-conversion-bar"
      aria-label={
        locale === "ar" ? "طرق التواصل السريعة" : "Quick contact actions"
      }
    >
      <a
        href={`https://wa.me/${GLLORIA_CONFIRMATION_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
      >
        <span>WhatsApp</span>
      </a>
      <Link href="/booking">
        <span>{t("nav.primary")}</span>
        <ArrowUpLeft size={16} strokeWidth={1.5} />
      </Link>
    </nav>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { dir } = useLocale();
  return (
    <div className="site-shell" dir={dir}>
      <RevealObserver />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <MobileConversionBar />
      <a
        className="whatsapp-float"
        href={`https://wa.me/${GLLORIA_CONFIRMATION_WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصلي مع Glloria على واتساب"
      >
        <span>واتساب</span>
        <ArrowUpLeft size={17} strokeWidth={1.5} />
      </a>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <span className="route-loader-mark" aria-hidden="true" />
      <span>Glloria / loading</span>
    </div>
  );
}

function AppContent() {
  const [location] = useLocation();
  if (location.startsWith("/admin"))
    return (
      <Suspense fallback={<PageLoader />}>
        <Admin />
      </Suspense>
    );
  return (
    <Shell>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/booking" component={Booking} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Shell>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" switchable>
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </ThemeProvider>
  );
}
