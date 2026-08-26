# Glloria v5 Audit

## Current strengths

The published site already has a coherent Warm Editorial Atelier direction: ivory background, clay accents, thin rules, asymmetric layouts, strong Arabic display headlines, a custom Glloria logo, a dedicated booking route, project archive, project detail routes, testimonials empty state, floating WhatsApp CTA, and a responsive header.

## Issues confirmed on the published homepage

The public page currently exposes a `Made with Manus` badge in the visible viewport. Primary CTAs are inconsistent: the homepage uses `اكتشفي الأعمال`, `اطلبي استشارتك`, `كوني جزءاً من الحكاية`, and `احجزي استشارتك`, while the requested hierarchy is `احجزي استشارتك` as the primary action and `شاهدي الأعمال` as the secondary action. The testimonials section uses unfinished-state wording such as `ستضاف هنا` and `COMING SOON`, which should be replaced by a compact, truthful placeholder that does not look incomplete. The existing homepage is also light on professional biography, qualifications, service area, and the wider project-case-study structure requested.

## Reusable components and routes

The site shell in `client/src/App.tsx` is reusable for header, footer, floating WhatsApp, routing, and public-page layout. `DashboardLayout` remains reusable for the protected admin area. `ShareActions`, `TestimonialsSection`, `Projects`, `ProjectDetail`, `Booking`, and the shadcn form primitives are existing components to extend rather than replace. The project archive already has the interior/architectural filter model and can be expanded with richer categories without changing the route contract. The three existing slugs are `private-residence`, `cafe-namaa`, and `quiet-bedroom`.

## Route and content verification

The homepage links to `/projects`, `/booking`, `/#about`, `/#services`, and `/#testimonials`. The public footer exposes WhatsApp at `https://wa.me/201097430973`, Instagram at `https://www.instagram.com/glloriaaa`, Facebook at `https://www.facebook.com/glloriaaa`, and `hello@glloria.studio`. The current booking confirmation creates a WhatsApp URL with the supplied number but does not yet collect city, property type, area, budget, description, or privacy consent.

## Design direction for v5

Keep the current editorial system and earth palette. Improve hierarchy by making the booking CTA visually dominant, use a concise testimonials empty state, turn every project into a case-study spread with clear image provenance labels, and add a more informative About Heba block. Mobile work should preserve the asymmetric feel while preventing horizontal overflow and keeping form controls comfortably tappable.

## Attribution verification

A repository and production-bundle search found no `Made with Manus` string in `client/src` or `dist/public`. The phrase was visible in the earlier published-page extraction as a separate bottom overlay rather than in the app content. Because it is not emitted by the application bundle, it appears to be platform-injected attribution from the Manus hosting/preview layer and cannot be removed safely by changing Glloria's page components. The Glloria UI itself contains no attribution element.
