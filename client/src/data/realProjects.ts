/**
 * Real Glloria project records — copy layer.
 *
 * WHAT THIS IS
 * ------------
 * Bilingual descriptive copy for the studio's six real projects, written from
 * the photography the studio supplied. It is deliberately separated from the
 * image registry (`projectImages.ts`) so the words can be reviewed, corrected
 * and translated without touching asset paths, and so the studio can move any
 * of these into the database-backed admin console later without a rewrite.
 *
 * TRUTHFULNESS RULES APPLIED HERE
 * -------------------------------
 * 1. Nothing is invented. City, year, floor area, client name, budget and
 *    scope are left as `null` because the studio has not supplied them. They
 *    must be filled in from the admin console (or here) before they render —
 *    the UI omits any field that is null rather than printing a placeholder.
 * 2. `assetKind` states plainly whether a project's imagery is executed
 *    photography, a 3D visualisation, or a mix. The villa set is renders only
 *    and is labelled as such, so no visitor can mistake it for built work.
 * 3. Descriptions only describe what is visible in the images — materials,
 *    palette, lighting strategy, spatial moves. No performance claims, no
 *    testimonials, no "award-winning" language.
 *
 * STATUS: copy is ready; the image files had not reached the repository at the
 * time of writing, so `imageSlug` records the basename that
 * `scripts/ingest-images.sh` will produce. Nothing here is rendered until the
 * matching files exist under client/public/images/.
 */

export type AssetKind = "executed" | "visualisation" | "mixed";

export type LocalizedText = { ar: string; en: string };

export type RealProject = {
  slug: string;
  /** Basename passed to scripts/ingest-images.sh, e.g. "project-boska". */
  imageSlug: string;
  name: LocalizedText;
  discipline: "interior" | "architectural";
  sector: LocalizedText;
  assetKind: AssetKind;
  /** One line for the archive grid. */
  intro: LocalizedText;
  /** The editorial pull-quote on the detail page. */
  statement: LocalizedText;
  /** Full project story. */
  description: LocalizedText;
  /** Materials and palette actually visible in the supplied images. */
  materials: LocalizedText;
  /** Honest provenance label shown under the gallery. */
  provenance: LocalizedText;
  /** Facts the studio has not supplied yet — never guessed. */
  location: string | null;
  year: number | null;
  area: string | null;
  serviceScope: string | null;
  imageCount: number;
};

export const realProjects: RealProject[] = [
  {
    slug: "boska",
    imageSlug: "project-boska",
    name: { ar: "BOSKA — كافيه ومطعم", en: "Boska Café & Restaurant" },
    discipline: "interior",
    sector: { ar: "مطاعم وكافيهات", en: "Food & beverage" },
    assetKind: "mixed",
    intro: {
      ar: "مشروع كامل من الرندر إلى التنفيذ، بمواد خام صريحة وإضاءة تصنع المزاج.",
      en: "A full journey from render to opening night, in honest raw materials and mood-making light.",
    },
    statement: {
      ar: "مكان يُبنى ليُتذكَّر، لا ليُرى فقط.",
      en: "A place built to be remembered, not just looked at.",
    },
    description: {
      ar: "بدأ المشروع بتصوّر ثلاثي الأبعاد للصالة الداخلية: جدار خشبي مضلّع يمتد بطول الممر، يقابله جدار خرساني بملمس صخري مكسور الحافة يعمل كقطعة نحتية تفصل الاستقبال عن صالة الطعام. الطاولات من خشب الجوز بتعشيق شيفرون، والسقف مكشوف بلون داكن ليختفي وتبقى الإضاءة المعلّقة هي البطل.\n\nمن الرندر انتقل العمل إلى الموقع: تركيب حروف الواجهة المضيئة بالـ LED، ومد إنارة الحبال فوق الجلسة الخارجية، وتنسيق الساحة بجدار جابيون حجري بين النخيل. النتيجة واجهة ليلية تُقرأ من الشارع قبل أن تصل إليها.",
      en: "The project began as a 3D study of the interior: a slatted timber wall running the length of the circulation, answered by a broken-edge textured concrete wall that works as a sculptural divider between reception and dining. Walnut tables in chevron, and a dark exposed ceiling so the pendants carry the room.\n\nFrom render the work moved on site: LED channel letters mounted on the façade, festoon lighting strung above the outdoor terrace, and the forecourt framed by a stone gabion wall between the palms. The result is a night façade you read from the street before you reach it.",
    },
    materials: {
      ar: "خشب جوز، خشب مضلّع فاتح، خرسانة بملمس صخري، معدن أسود، إنارة LED دافئة، حجر جابيون.",
      en: "Walnut, pale timber battens, textured concrete, black metal, warm LED, gabion stone.",
    },
    provenance: {
      ar: "يشمل تصوّراً ثلاثي الأبعاد للصالة الداخلية وصور تنفيذ فعلي للواجهة والساحة، بالإضافة إلى توثيق مراحل التركيب.",
      en: "Includes a 3D visualisation of the interior plus executed photography of the façade and forecourt, with on-site installation documentation.",
    },
    location: null,
    year: null,
    area: null,
    serviceScope: null,
    imageCount: 6,
  },
  {
    slug: "elite",
    imageSlug: "project-elite",
    name: { ar: "Elite — مركز تجميل", en: "Elite Beauty Center" },
    discipline: "interior",
    sector: { ar: "عيادات ومراكز تجميل", en: "Clinics & beauty" },
    assetKind: "executed",
    intro: {
      ar: "استقبال يقول رسالة العلامة من أول نظرة، وممر يقود الزائرة بهدوء.",
      en: "A reception that states the brand in one glance, and a corridor that guides you quietly.",
    },
    statement: {
      ar: "حيث تلتقي الأناقة بالخبرة.",
      en: "Where beauty meets expertise.",
    },
    description: {
      ar: "قلب المشروع كاونتر استقبال منحني بكسوة خشبية، تتقدّمه عبارة العلامة بحروف بارزة، ويعلوه قوس خشبي يحتضن الشعار المعدني الذهبي مع إنارة معلّقة رفيعة. الانحناء ليس زخرفة: هو ما يجعل مساحة المدخل الضيقة تبدو أوسع ويوجّه الحركة نحو الممر.\n\nالممر عولج كمعرض صغير — لوحات لاين-آرت بألوان هادئة على جدار واحد، وإنارة خطية على الجدار المقابل، مع لمبات إشارة حمراء فوق أبواب الغرف تخبر الفريق بحالة كل غرفة دون كلام. غرف الانتظار بأثاث منحني بألوان ترابية وستائر زيبرا تتحكّم في الضوء الطبيعي، وجدار الكوّة المضيء يعمل كنقطة توقف بصرية بين لوحتين ملوّنتين.",
      en: "The project turns on a curved, timber-clad reception desk carrying the brand line in raised letters, crowned by a wooden arch that holds the brushed-gold logo under slim pendants. The curve is not decoration: it makes a tight entrance read wider and steers movement toward the corridor.\n\nThe corridor is treated as a small gallery — soft line-art canvases on one side, a linear wall light opposite, and red indicator lamps above each room door that tell the team a room's status without a word. Waiting rooms use rounded furniture in earth tones with zebra blinds metering the daylight, while a lit display niche acts as a visual pause between two vivid canvases.",
    },
    materials: {
      ar: "خشب بعروق واضحة، معدن ذهبي مصقول، أقمشة مخمل ترابية، ستائر زيبرا، إنارة خطية مخفية.",
      en: "Strongly grained timber, brushed gold metal, earth-toned velvets, zebra blinds, concealed linear lighting.",
    },
    provenance: {
      ar: "صور تنفيذ فعلي للمشروع بعد التسليم.",
      en: "Executed-project photography taken after handover.",
    },
    location: null,
    year: null,
    area: null,
    serviceScope: null,
    imageCount: 5,
  },
  {
    slug: "sara-alaa",
    imageSlug: "project-sara-alaa",
    name: { ar: "Sara Alaa — عيادة تجميل", en: "Sara Alaa Clinic" },
    discipline: "interior",
    sector: { ar: "عيادات ومراكز تجميل", en: "Clinics & beauty" },
    assetKind: "executed",
    intro: {
      ar: "أسود وذهبي عند الاستقبال، ثم بنفسجي وخوص في الانتظار — تباين محسوب.",
      en: "Black and gold at reception, then plum and woven fibre in the lounge — a measured contrast.",
    },
    statement: {
      ar: "الهدوء الذي يسبق الثقة.",
      en: "The calm that comes before confidence.",
    },
    description: {
      ar: "الاستقبال يعتمد على جدار أسود مؤطّر بالبواسيري يحمل الشعار الذهبي، تعلوه نجفة متفرّعة تشبه الأغصان. الاختيار مقصود: خلفية داكنة واحدة تجعل الشعار وصور العميلات تظهر بوضوح، بينما الواجهة الزجاجية الممتدة من الأرض للسقف تُدخل الضوء والشجر إلى داخل المساحة.\n\nمناطق الانتظار تنتقل إلى مزاج أدفأ — كراسي مخمل بنفسجي بإطارات معدنية رفيعة، وألواح خشبية مقوّسة تكسر استقامة الجدران، وتشكيل من أطباق الخوص المنسوجة يضيف ملمساً حرفياً يوازن لمعان المعدن. المرآة القوسية الكبيرة تضاعف عمق المساحة وتخدم غرضاً عملياً قبل الخروج.",
      en: "Reception rests on a panelled black wall carrying the gold logotype beneath a branching chandelier. The choice is deliberate: one dark backdrop lets the logo and client imagery read cleanly, while floor-to-ceiling glazing pulls daylight and treetops inside.\n\nThe waiting areas shift to a warmer register — plum velvet chairs on slim metal frames, arched timber panels breaking the flat walls, and a composition of woven fibre discs adding a craft texture that offsets the metal sheen. A tall arched mirror doubles the perceived depth and does practical work on the way out.",
    },
    materials: {
      ar: "بواسيري أسود، معدن ذهبي، مخمل بنفسجي، خشب مقوّس، خوص منسوج، خيزران، زجاج ممتد.",
      en: "Black panelling, gold metal, plum velvet, arched timber, woven fibre, rattan, full-height glazing.",
    },
    provenance: {
      ar: "صور تنفيذ فعلي للمشروع بعد التسليم.",
      en: "Executed-project photography taken after handover.",
    },
    location: null,
    year: null,
    area: null,
    serviceScope: null,
    imageCount: 3,
  },
  {
    slug: "classic-white-clinic",
    imageSlug: "project-classic-white-clinic",
    name: { ar: "عيادة كلاسيك أبيض", en: "Classic White Clinic" },
    discipline: "interior",
    sector: { ar: "عيادات ومراكز تجميل", en: "Clinics & beauty" },
    assetKind: "executed",
    intro: {
      ar: "بواسيري فرنسي أبيض بالكامل، يعتمد على الظل بدل اللون.",
      en: "An all-white French panelled room that works with shadow instead of colour.",
    },
    statement: {
      ar: "حين يصبح الأبيض قراراً لا غياباً.",
      en: "When white is a decision, not an absence.",
    },
    description: {
      ar: "مساحة أحادية اللون بالكامل: جدران بواسيري محفور بارتفاع كامل، وأثاث فرنسي كلاسيكي بأرجل منحوتة، وطاولات رخام. حين يُلغى اللون يصبح النقش والظل هما ما يرسم المكان — وهو ما تؤكده الأبليكات الذهبية بأزهار الكريستال التي تُسقط ظلالاً متفرّعة على الجدار المطفي.\n\nالأرضية رخام فاتح مع سجادة منقوشة تحدّد منطقة الجلوس داخل المساحة المفتوحة، والشاشة مثبّتة داخل تكوين البواسيري نفسه بدل أن تُعلَّق فوقه، فتبقى جزءاً من الجدار لا إضافة عليه.",
      en: "A fully monochrome room: full-height carved panelling, classical French seating on shaped legs, and marble-topped tables. Removing colour hands the drawing to profile and shadow — which is exactly what the gold crystal-flower sconces exploit, throwing branched shadows across the matte wall.\n\nA pale marble floor with a patterned rug defines the seating zone inside the open plan, and the screen is set within the panelling composition rather than hung over it, so it stays part of the wall instead of an addition to it.",
    },
    materials: {
      ar: "بواسيري محفور، رخام فاتح، أقمشة كريمية مطرّزة، معدن ذهبي، كريستال.",
      en: "Carved panelling, pale marble, cream embroidered upholstery, gold metal, crystal.",
    },
    provenance: {
      ar: "صور تنفيذ فعلي للمشروع بعد التسليم.",
      en: "Executed-project photography taken after handover.",
    },
    location: null,
    year: null,
    area: null,
    serviceScope: null,
    imageCount: 3,
  },
  {
    slug: "private-villa",
    imageSlug: "project-private-villa",
    name: {
      ar: "فيلا خاصة — تصوّر ثلاثي الأبعاد",
      en: "Private Villa — 3D Study",
    },
    discipline: "architectural",
    sector: { ar: "سكني", en: "Residential" },
    assetKind: "visualisation",
    intro: {
      ar: "دراسة كاملة للمداخل والسلم والمعيشة، بالرخام والذهب والضوء المخفي.",
      en: "A full study of entrance, stair and living, in marble, gold and concealed light.",
    },
    statement: {
      ar: "السلم ليس وصلة بين طابقين، بل أول جملة في البيت.",
      en: "A staircase is not a link between floors; it is the house's opening sentence.",
    },
    description: {
      ar: "التصوّر يدور حول محور واحد: المدخل ثم السلم. صالة المدخل مؤطّرة بإطار رخام أسود مغروس في الأرضية الفاتحة يقود العين مباشرة إلى الباب المزدوج، والنجفة الذهبية معلّقة في منتصف الفراغ لتحدّد ارتفاعه.\n\nالسلم منحنٍ بدرابزين رخام أسود متصل كشريط واحد، مع إنارة مخفية أسفل كل درجة تجعل الكتلة تبدو طائرة. المعيشة والسفرة يكملان نفس اللغة: ألواح رخام مؤطّرة بشرائط ذهبية رفيعة، وأسقف جبسية بتجاويف إضاءة غير مباشرة، ولمسات لون مركّزة — أخضر، كحلي، أحمر — تُستخدم بحساب على قطعة أو قطعتين في كل غرفة.",
      en: "The study turns on a single axis: entrance, then stair. The entrance hall is framed by a black marble inlay set into the pale floor that leads the eye straight to the double doors, with a gold chandelier hung mid-volume to register the ceiling height.\n\nThe stair curves behind a continuous black marble balustrade, with concealed lighting under each tread so the mass appears to float. Living and dining continue the same language: marble panels edged in slim gold trim, gypsum ceilings with indirect coves, and concentrated colour — green, navy, red — spent carefully on one or two pieces per room.",
    },
    materials: {
      ar: "رخام أبيض وأسود، شرائط معدن ذهبي، جبس بتجاويف إضاءة، مخمل ملوّن، خشب داكن.",
      en: "White and black marble, gold metal trim, coved gypsum, coloured velvet, dark timber.",
    },
    provenance: {
      ar: "تصوّر ثلاثي الأبعاد (رندر) — ليست صور تنفيذ فعلي.",
      en: "3D visualisation — not executed-project photography.",
    },
    location: null,
    year: null,
    area: null,
    serviceScope: null,
    imageCount: 5,
  },
  {
    slug: "private-residence",
    imageSlug: "project-private-residence",
    name: { ar: "شقة سكنية خاصة", en: "Private Residence" },
    discipline: "interior",
    sector: { ar: "سكني", en: "Residential" },
    assetKind: "executed",
    intro: {
      ar: "بيت يُسكن فعلاً: أشكال منحنية، لون واحد جريء، وتفاصيل تُرى يومياً.",
      en: "A home that is actually lived in: rounded forms, one bold colour, details you meet daily.",
    },
    statement: {
      ar: "المساحة الصغيرة لا تحتاج أثاثاً أصغر، بل قرارات أوضح.",
      en: "A small space does not need smaller furniture; it needs clearer decisions.",
    },
    description: {
      ar: "المعيشة تعتمد على تباين واحد محسوب: شيزلونج كريمي منحني بلا أرجل ظاهرة، يقابله كرسي مخمل أخضر عميق بأذرع ممتلئة وأرجل خشبية دائرية. اللون الأخضر هو القرار الوحيد الجريء في الغرفة، وكل ما حوله محايد ليخدمه — وسائد بالكريمي والخردلي، وسجادة رمادية تربط المجموعة.\n\nفي الممر عُلّقت لوحة أفق مدينة بألوان نحاسية تحت إضاءة لوحات موجّهة، فأصبح الممر محطة بدل أن يكون عبوراً. وفي منطقة الطعام مرآة دائرية كبيرة بإضاءة خلفية مثبّتة على ورق حائط بملمس محفور، تعكس المساحة وتضاعفها، مع فاصل خشبي مضلّع يفصل دون أن يغلق.",
      en: "The living room rests on one measured contrast: a curved cream chaise with no visible legs, answered by a deep green velvet armchair with full arms on round wooden feet. The green is the only bold decision in the room, and everything around it stays neutral to serve it — cream and mustard cushions, a grey rug tying the group together.\n\nIn the hallway a copper-toned city skyline canvas sits under a directed picture light, turning a passage into a stop. In the dining area a large backlit circular mirror is mounted on textured wallpaper, reflecting and doubling the space, with a slatted timber screen that divides without closing.",
    },
    materials: {
      ar: "مخمل أخضر، أقمشة كريمية، خشب دافئ، بورسلين رمادي، ورق حائط بملمس، إنارة خلفية مخفية.",
      en: "Green velvet, cream upholstery, warm timber, grey porcelain, textured wallpaper, concealed backlighting.",
    },
    provenance: {
      ar: "صور تنفيذ فعلي للمشروع بعد التسليم.",
      en: "Executed-project photography taken after handover.",
    },
    location: null,
    year: null,
    area: null,
    serviceScope: null,
    imageCount: 3,
  },
];

/** Facts the studio still needs to supply before they can render. */
export function missingFacts(project: RealProject): string[] {
  return (
    [
      ["location", project.location],
      ["year", project.year],
      ["area", project.area],
      ["serviceScope", project.serviceScope],
    ] as const
  )
    .filter(([, value]) => value === null)
    .map(([key]) => key);
}
