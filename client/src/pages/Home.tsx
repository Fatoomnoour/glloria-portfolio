/* Glloria Design Direction: Cinematic Warm Editorial — a full-bleed architectural opening with quiet text overlays. */
import { ArrowDownLeft, ArrowUpLeft, Check, MoveUpLeft } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { useLocale } from "../contexts/LocaleContext";

const TestimonialsSection = lazy(
  () => import("../components/TestimonialsSection")
);

const heroImage = "/manus-storage/glloria-hero_b9a954a0.jpg";
const hebaPortrait = "/manus-storage/heba-portrait-clean_30012c25.png";
const projectImages = {
  interior: "/manus-storage/original-01_ebedc055.webp",
  boska: "/manus-storage/original-05_2f557110.webp",
};
const services = [
  {
    number: "01",
    title: "تصميم داخلي",
    enTitle: "Interior design",
    english: "INTERIOR DESIGN",
    ar: "من الفكرة الأولى إلى لوحة الألوان وتفاصيل المكان؛ نصمم فراغاً متكاملاً يشبه إيقاع حياتك.",
    en: "From the first idea to palettes and details, we shape a complete space around your rhythm.",
  },
  {
    number: "02",
    title: "تصوّر ثلاثي الأبعاد",
    enTitle: "3D visualisation",
    english: "3D VISUALIZATION",
    ar: "نحوّل التصور إلى صورة يمكن رؤيتها والإحساس بها قبل أن تبدأ أي خطوة في الموقع.",
    en: "See the materials, light, and atmosphere before the first site step begins.",
  },
  {
    number: "03",
    title: "تنفيذ وإشراف",
    enTitle: "Execution & supervision",
    english: "EXECUTION",
    ar: "اختيار الخامات، متابعة التفاصيل، والتنسيق مع فريق التنفيذ حتى تصل الفكرة إلى مكانها الصحيح.",
    en: "Material selection, site coordination, and careful supervision from idea to delivery.",
  },
];
const steps = [
  {
    number: "01",
    ar: [
      "نستمع",
      "مكالمة قصيرة نفهم فيها المكان، احتياجاته، وما تريدين أن تشعري به داخله.",
    ],
    en: [
      "Listen",
      "A short call to understand your space, needs, and how you want it to feel.",
    ],
  },
  {
    number: "02",
    ar: [
      "نكتشف",
      "زيارة وقياسات وقراءة للضوء والحركة والخامات التي سيبنى عليها التصميم.",
    ],
    en: [
      "Discover",
      "We read the light, movement, and materials that will shape the design.",
    ],
  },
  {
    number: "03",
    ar: [
      "نصمم",
      "كونسبت واضح، moodboard، وتفاصيل بصرية تجعل القرار أسهل وأكثر اطمئناناً.",
    ],
    en: [
      "Design",
      "A clear concept, moodboard, and visual details that make decisions easier.",
    ],
  },
  {
    number: "04",
    ar: [
      "نُنجز",
      "تنسيق وتنفيذ ومتابعة دقيقة حتى يصبح التصميم جزءاً طبيعياً من يومك.",
    ],
    en: [
      "Deliver",
      "Thoughtful coordination until the design becomes a natural part of your day.",
    ],
  },
];
const faqs = [
  {
    ar: [
      "كم سعر الاستشارة؟",
      "يتم تأكيد سعر الاستشارة حسب نوعها ومدتها بعد مراجعة تفاصيل المشروع، وتظهر التكلفة بوضوح قبل اعتماد الموعد.",
    ],
    en: [
      "What is the consultation fee?",
      "The consultation fee depends on the format and duration. We confirm it clearly after reviewing your project details.",
    ],
  },
  {
    ar: [
      "كم تستغرق الاستشارة؟",
      "الاستشارة الأساسية مدتها 45 دقيقة، ويمكن الاتفاق على جلسات أطول عند الحاجة.",
    ],
    en: [
      "How long is a consultation?",
      "The standard consultation is 45 minutes. Longer sessions can be arranged when needed.",
    ],
  },
  {
    ar: [
      "ما المدن والمناطق التي تخدمونها؟",
      "نستقبل مشاريع من قنا والصعيد والقاهرة، ونحدد الزيارات حسب نطاق المشروع، مع توفير استشارات أونلاين.",
    ],
    en: [
      "Which areas do you serve?",
      "We work across Qena, Upper Egypt, and Cairo, with site visits planned by project scope and online consultations available.",
    ],
  },
  {
    ar: [
      "هل يمكن العمل عن بُعد؟",
      "نعم. نوفر باقات تصميم واستشارات أونلاين تشمل الرندرات والمخططات وتوصيات الخامات.",
    ],
    en: [
      "Can you work remotely?",
      "Yes. Online packages can include consultations, renders, drawings, and material guidance.",
    ],
  },
  {
    ar: [
      "ما مدة التصميم والتنفيذ؟",
      "عادة تستغرق مرحلة التصميم من أسبوعين إلى أربعة أسابيع، بينما يختلف التنفيذ حسب المساحة ونطاق الأعمال.",
    ],
    en: [
      "How long do design and execution take?",
      "Design typically takes two to four weeks; execution varies by area, scope, and site conditions.",
    ],
  },
  {
    ar: [
      "ما الفرق بين التصميم والإشراف والتنفيذ؟",
      "التصميم يحدد الفكرة والرسومات، والإشراف يراجع جودة التنفيذ، أما التنفيذ فيشمل إدارة الأعمال والخامات حتى التسليم.",
    ],
    en: [
      "What is the difference between design, supervision, and execution?",
      "Design defines the concept and drawings; supervision reviews quality; execution manages work and materials through delivery.",
    ],
  },
];

export default function Home() {
  const { locale, t } = useLocale();
  const isArabic = locale === "ar";
  return (
    <div className="home-page">
      <section className="hero hero-immersive">
        <div className="hero-media">
          <img
            className="hero-parallax-image"
            src={heroImage}
            alt={
              isArabic
                ? "مساحة معيشة دافئة من تصميم Glloria"
                : "Warm living space designed by Glloria"
            }
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
          />
          <div className="hero-cinematic-wash" aria-hidden="true" />
        </div>
        <div className="hero-overlay-grid section-pad">
          <div className="hero-index editorial-index">
            <span>01</span>
            <span>THE BEGINNING</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Glloria / Interior Design Studio</p>
            <h1>
              {isArabic ? (
                <>
                  مساحات
                  <br />
                  <em>تُشبه أصحابها.</em>
                </>
              ) : (
                <>
                  Spaces
                  <br />
                  <em>that feel like you.</em>
                </>
              )}
            </h1>
            <p className="hero-intro">
              {isArabic
                ? "نصمم بيوتاً وأماكن عمل تحمل حكاية أصحابها؛ بهدوء، بدقة، وبعين ترى التفاصيل الصغيرة."
                : "We shape homes and workspaces around the people who live in them — quietly, precisely, and with an eye for the small details."}
            </p>
            <div className="hero-actions">
              <Link className="dark-button" href="/booking">
                {t("nav.primary")} <ArrowUpLeft size={17} />
              </Link>
              <a className="text-link" href="#projects">
                {t("nav.secondary")}{" "}
                <ArrowDownLeft size={17} strokeWidth={1.4} />
              </a>
            </div>
          </div>
          <div className="hero-caption hero-overlay-caption">
            <span>01 / 04</span>
            <span>Private Residence</span>
          </div>
          <div className="hero-side-note">
            DESIGNED FOR LIVING
            <br />
            NOT JUST LOOKING
          </div>
          <a
            className="hero-scroll-cue"
            href="#about"
            aria-label={isArabic ? "اكتشفي المساحة" : "SCROLL TO EXPLORE"}
          >
            <span>{isArabic ? "اكتشفي المساحة" : "SCROLL TO EXPLORE"}</span>
            <ArrowDownLeft size={15} strokeWidth={1.4} />
          </a>
        </div>
      </section>
      <div
        className="hero-marquee"
        aria-label="DESIGNED FOR LIVING — NOT JUST LOOKING"
      >
        <div className="hero-marquee-track">
          <span>DESIGNED FOR LIVING — NOT JUST LOOKING</span>
          <span>DESIGNED FOR LIVING — NOT JUST LOOKING</span>
          <span>DESIGNED FOR LIVING — NOT JUST LOOKING</span>
          <span>DESIGNED FOR LIVING — NOT JUST LOOKING</span>
        </div>
      </div>
      <section className="manifesto section-pad" id="about">
        <div className="section-marker">
          <span>02</span>
          <span>THE STUDIO</span>
        </div>
        <div className="manifesto-copy">
          <p className="eyebrow">
            {isArabic ? "عن هبة / Glloria" : "ABOUT HEBA / GLLORIA"}
          </p>
          <h2>
            {isArabic ? (
              <>
                البيت ليس خلفية.
                <br />
                <em>إنه جزء من الحكاية.</em>
              </>
            ) : (
              <>
                A home is not a backdrop.
                <br />
                <em>It is part of the story.</em>
              </>
            )}
          </h2>
          <p>
            {isArabic
              ? "المهندسة هبة الدمراني مؤسسة Glloria ومصممة داخلية؛ تؤمن أن البيت يجب أن يحكي حكاية أصحابه، وأن تبدأ كل مساحة من الإنسان قبل التفاصيل."
              : "Heba El Damarany is Glloria's founder and an interior designer. She believes a home should tell the story of its people, and that every space should begin with the person before the details."}
          </p>
          <blockquote className="founder-quote">
            {isArabic
              ? "بيتك لازم يحكي حكاية أنت مين. <3"
              : "Your home should tell the story of who you are <3"}
          </blockquote>
          <div className="about-credentials">
            <span>{isArabic ? "مؤسسة Glloria" : "Glloria founder"}</span>
            <span>{isArabic ? "مصممة داخلية" : "Interior designer"}</span>
          </div>
          <Link className="text-link" href="/projects">
            {isArabic ? "شاهدي طريقة تفكيرنا" : "See our way of thinking"}{" "}
            <MoveUpLeft size={17} strokeWidth={1.4} />
          </Link>
        </div>
        <div className="manifesto-aside founder-card">
          <div className="founder-portrait">
            <img
              src={hebaPortrait}
              alt={
                isArabic
                  ? "المهندسة هبة الدمراني، مؤسسة Glloria"
                  : "Heba El Damarany, founder of Glloria"
              }
              loading="lazy"
              decoding="async"
              sizes="(max-width: 700px) 76vw, 30vw"
            />
          </div>
          <p className="founder-caption">
            Heba El Damarany
            <br />
            <span>FOUNDER / GLLORIA STUDIO</span>
          </p>
          <div className="studio-seal">
            <img
              src="/manus-storage/glloria-logo_c03b6188.png"
              alt="Glloria logo"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
      <section className="projects-preview section-pad" id="projects">
        <div className="section-heading">
          <div className="section-marker">
            <span>03</span>
            <span>SELECTED WORK</span>
          </div>
          <div className="heading-side">
            <p>{isArabic ? "أعمال مختارة" : "Selected work"}</p>
            <Link className="text-link" href="/projects">
              {t("nav.secondary")} <ArrowUpLeft size={16} strokeWidth={1.4} />
            </Link>
          </div>
        </div>
        <div className="project-feature-grid">
          <Link
            href="/projects/interior"
            className="project-card project-card-large"
          >
            <div className="project-image">
              <img
                src={projectImages.interior}
                alt={
                  isArabic
                    ? "منزل خاص — صورة أصلية للمشروع"
                    : "Private Residence — original project image"
                }
                loading="lazy"
                decoding="async"
                sizes="(max-width: 760px) 100vw, 58vw"
              />
              <span className="project-arrow">
                <ArrowUpLeft size={19} strokeWidth={1.4} />
              </span>
            </div>
            <div className="project-meta">
              <span>01 / PRIVATE RESIDENCE</span>
            </div>
            <h3>Private Residence</h3>
          </Link>
          <div className="project-stack">
            <Link href="/projects/boska" className="project-card">
              <div className="project-image">
                <img
                  src={projectImages.boska}
                  alt={
                    isArabic
                      ? "BOSKA كافيه ومطعم — صورة أصلية للمشروع"
                      : "Boska Café & Restaurant — original project image"
                  }
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 760px) 100vw, 38vw"
                />
                <span className="project-arrow">
                  <ArrowUpLeft size={17} strokeWidth={1.4} />
                </span>
              </div>
              <div className="project-meta">
                <span>02 / CAFE</span>
              </div>
              <h3>Boska Café &amp; Restaurant</h3>
            </Link>
          </div>
        </div>
      </section>
      <section className="services section-pad" id="services">
        <div className="section-marker">
          <span>04</span>
          <span>WHAT WE DO</span>
        </div>
        <div className="services-header">
          <p className="eyebrow">{isArabic ? "الخدمات" : "Services"}</p>
          <h2>
            {isArabic ? (
              <>
                من أول سؤال
                <br />
                <em>إلى آخر تفصيلة.</em>
              </>
            ) : (
              <>
                From first question
                <br />
                <em>to final detail.</em>
              </>
            )}
          </h2>
        </div>
        <div className="services-list">
          {services.map(service => (
            <div className="service-row" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>
                {isArabic ? service.title : service.enTitle}
                <small>{service.english}</small>
              </h3>
              <p>{isArabic ? service.ar : service.en}</p>
              <ArrowUpLeft
                className="service-arrow"
                size={19}
                strokeWidth={1.25}
              />
            </div>
          ))}
        </div>
        <Link href="/booking" className="clay-button">
          {t("nav.primary")} <ArrowUpLeft size={17} strokeWidth={1.4} />
        </Link>
      </section>
      <section className="process section-pad">
        <div className="section-marker">
          <span>05</span>
          <span>THE PROCESS</span>
        </div>
        <div className="process-intro">
          <p className="eyebrow">{isArabic ? "طريقة العمل" : "The process"}</p>
          <h2>
            {isArabic ? (
              <>
                واضحة، إنسانية،
                <br />
                <em>ومصممة لكِ.</em>
              </>
            ) : (
              <>
                Clear, human,
                <br />
                <em>and made for you.</em>
              </>
            )}
          </h2>
        </div>
        <div className="process-list">
          {steps.map(step => {
            const content = isArabic ? step.ar : step.en;
            return (
              <div className="process-step" key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{content[0]}</h3>
                  <p>{content[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="faq-section section-pad" id="faq">
        <div className="section-marker">
          <span>06</span>
          <span>FAQ / BEFORE WE BEGIN</span>
        </div>
        <div className="faq-heading">
          <p className="eyebrow">{t("faq.title")}</p>
          <h2>
            {isArabic ? (
              <>
                إجابات واضحة
                <br />
                <em>قبل أول خطوة.</em>
              </>
            ) : (
              <>
                Clear answers
                <br />
                <em>before the first step.</em>
              </>
            )}
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const content = isArabic ? faq.ar : faq.en;
            return (
              <details className="faq-item" key={index}>
                <summary>
                  <span>0{index + 1}</span>
                  <strong>{content[0]}</strong>
                  <ArrowDownLeft size={16} />
                </summary>
                <p>{content[1]}</p>
              </details>
            );
          })}
        </div>
      </section>
      <Suspense fallback={null}>
        <TestimonialsSection />
      </Suspense>
      <section className="closing-cta section-pad">
        <div className="closing-ornament" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">
          {isArabic
            ? "المشروع القادم قد يكون هنا"
            : "The next project could be here"}
        </p>
        <h2>
          {isArabic ? (
            <>
              احكي لنا عن المكان
              <br />
              <em>{isArabic ? "الذي تتخيلينه." : ""}</em>
            </>
          ) : (
            <>
              Tell us about the place
              <br />
              <em>you imagine.</em>
            </>
          )}
        </h2>
        <Link href="/booking" className="dark-button">
          {t("nav.primary")} <ArrowUpLeft size={18} strokeWidth={1.4} />
        </Link>
        <div className="closing-foot">
          <span>Glloria / Interior Design Studio</span>
          <span>
            <Check size={14} />{" "}
            {isArabic ? "نرد خلال 24 ساعة" : "We reply within 24 hours"}
          </span>
        </div>
      </section>
    </div>
  );
}
