# Glloria — Design Direction

## Three stylistic approaches

### Theme Name: Warm Editorial Atelier
Very Brief Intro: A refined, tactile interior-design portfolio with ivory space, charcoal typography, clay accents, and magazine-like project storytelling. It feels personal, composed, and rooted in materiality rather than trends.
Probability: 0.04

### Theme Name: Desert Modernism
Very Brief Intro: A sunlit architectural direction built around sand, limestone, olive, and strong geometric framing. It presents Glloria as a confident regional studio with a calm, contemporary point of view.
Probability: 0.07

### Theme Name: Midnight Material Library
Very Brief Intro: A dark, cinematic portfolio with graphite surfaces, warm brass details, and dramatic project imagery. It feels premium and gallery-like, with the work emerging from shadow.
Probability: 0.02

## Selected approach: Warm Editorial Atelier

### Design Movement
Contemporary editorial minimalism blended with Mediterranean material culture and boutique architecture studio presentation.

### Core Principles
1. **Material before decoration:** typography, texture, and imagery should feel like paper, stone, wood, linen, and clay.
2. **Asymmetric calm:** use offset compositions, editorial columns, and quiet negative space instead of repetitive centered cards.
3. **Proof through projects:** the portfolio and case studies carry the story; copy supports the images rather than competing with them.
4. **Warm precision:** soft colors and tactile details paired with disciplined spacing, sharp hierarchy, and strong contrast.

### Color Philosophy
The base is warm ivory to create the feeling of a sunlit studio and premium paper. Charcoal creates professional legibility without the harshness of pure black. Terracotta-clay is the ownable signature accent, evoking fired ceramics, brick, and the human hand. Muted olive can appear in small doses as a natural counterpoint. No purple gradients, glossy neon, or default SaaS blue.

### Layout Paradigm
A long-form editorial canvas with an anchored side index on desktop, full-bleed image moments, offset content blocks, narrow reading measure for story copy, and deliberate transitions between light and clay-toned sections. Project cards should feel like pages in a lookbook, not equal tiles in a dashboard.

### Signature Elements
- A vertical numbered section index and small uppercase micro-labels.
- Thin hairline rules with terracotta markers, inspired by architectural drawings.
- Oversized italic serif pull-quotes and image captions positioned like a print spread.

### Interaction Philosophy
Every interaction should feel like turning a page or examining a material sample. Hover reveals project metadata with a small shift in crop and a calm accent line; filters are direct and readable; buttons feel tactile with a short press response. No interaction should distract from the work.

### Animation
Use 180–280ms transitions with a strong ease-out. Reveal hero copy in a restrained stagger, images with opacity plus a 1–2% translate, and project hover states with a subtle image scale up. Avoid continuous motion. Respect `prefers-reduced-motion` by disabling entrance transforms while preserving clarity.

### Typography System
- Display: **Cormorant Garamond**, 500–600; large, expressive, editorial headlines and pull quotes.
- Arabic/display/body: **Noto Kufi Arabic**, 400–700; reliable Arabic reading and UI hierarchy.
- Utility: **DM Mono**, 400; tiny labels, project numbers, metadata, and navigation hints.
- Headline hierarchy: oversized but short; body copy stays in a narrow measure; labels are small and letter-spaced in Latin or clearly weighted Arabic.

### Brand Essence
**Glloria creates thoughtful interiors for people who want their spaces to feel unmistakably theirs—through design that balances beauty, function, and the story of the home.**
Personality: warm, exacting, expressive.

### Brand Voice
Headlines are evocative but concrete. CTAs are invitations to a conversation, not pressure tactics. Microcopy is calm, direct, and human.

Example lines:
- “مساحات تُشبه أصحابها.”
- “احكي لنا عن المكان الذي تتخيله.”

### Wordmark & Logo
The mark is a minimal monogram built from two offset architectural corner lines that form a subtle **G** and an open floor-plan shape. The wordmark uses a custom-feeling high-contrast serif treatment for “Glloria” paired with a small monospaced studio descriptor. The symbol must work alone as a favicon and social avatar; never render the brand as plain default text only.

### Signature Brand Color
**Fired Clay — #B65E45**. A warm, grounded terracotta that signals craft, hospitality, and material intelligence, while remaining distinctive against ivory and charcoal.

## Page-specific reminders
- `client/src/index.css`: token system for ivory, charcoal, fired clay, olive, type scale, texture, selection, and motion.
- `client/src/App.tsx`: public editorial shell, RTL document direction, section routing, and accessible navigation.
- `client/src/pages/Home.tsx`: asymmetric lookbook landing page; hero imagery and project proof are primary.
- `client/src/pages/Projects.tsx`: portfolio index as a curated editorial archive with filters.
- `client/src/pages/ProjectDetail.tsx`: case-study reading experience with image captions and process narrative.
- `client/src/pages/Contact.tsx`: calm inquiry page with a compact form and direct WhatsApp route.
- `client/src/components/`: reusable branded primitives; keep rules, captions, labels, and buttons consistent.

## Style Decisions

- Every major page keeps the same ivory / charcoal / Fired Clay primitive system while changing composition: Home as lookbook, Projects as archive, Project Detail as case-study spread, and Contact as inquiry note.
- Project imagery is sunlit, tactile, and materially specific; generated hero imagery is paired with verified Unsplash interiors for the current content scaffold until Heba's approved project photography is supplied.
- The Glloria monogram recurs in the header, favicon, manifesto mark, detail metadata, and footer as an architectural signature rather than a one-off logo.
- CTAs remain conversational in Arabic: “ابدئي الحكاية”, “احكي لنا عن المكان”, and “احكي لنا عن مشروعك” instead of generic commercial prompts.
