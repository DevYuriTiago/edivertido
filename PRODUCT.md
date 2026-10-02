# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: anyone in Recife (and nearby: Olinda, Jaboatão, Camaragibe) looking for a haircut, beard, eyebrow or styling service — men, women and children. The page is a broad promotional surface for a full salon and barbershop.

Key secondary audience, and the reason the salon is different: families of autistic and neurodivergent people (TEA, TDAH, síndrome de Down, microcefalia, deficiência intelectual) and neurodivergent adults themselves, who often arrive after a bad experience elsewhere and need to see proof that the haircut will not turn into a crisis. Most visitors arrive on a phone, often over 4G.

## Product Purpose

Landing page for Edivertido Salão Inclusivo. Its single job is to get the visitor to start a conversation on WhatsApp (or come in person). Success = WhatsApp clicks; secondary = completed sensory-profile form, which sends a structured message to WhatsApp.

## Positioning

A complete salon and barbershop that is also built for neurodivergent people: an ABA therapist (Análise do Comportamento Aplicada) present in the service, the person's own pace, no audience watching, a sensory waiting room with play panels and floor mats. A regular salon can say "we serve autistic kids"; this one shows real photos of difficult cuts that still got finished.

## Operating Context

- Address: Rua do Cupim, 53, Graças, Recife, PE, 52011-170.
- Hours: Monday to Saturday 09:00–18:00; Sunday closed.
- WhatsApp: +55 81 98804-1234.
- Price is agreed case by case on WhatsApp before the visit; no fixed table on the site.
- No backend: all conversion goes through wa.me links; the form builds a human-readable WhatsApp message.

## Capabilities and Constraints

- Services (confirmed from the salon's own flyer): corte, barba, sobrancelha, corte infantil, masculino e feminino, penteados, venda de produtos.
- Stack already in place: Next.js 15 App Router, TypeScript strict, Tailwind v4, framer-motion, next/image, self-hosted fonts via next/font.
- Required control: a "Tirar ruído" switch. Off = the full, visually rich site. On = the whole site turns white, simple and uncluttered; real photos stay but smaller and without effects; color fields, decoration and motion go away. State persists across reloads.
- Domain comes only from NEXT_PUBLIC_SITE_URL (not yet set).
- Undecided / missing: CNPJ and legal name; parking and wheelchair access; ABA therapist's name and credentials; testimonials (none); video (none); operational answers to the "E se..." objections (none).

## Brand Commitments

- Name: Edivertido Salão Inclusivo.
- Logo: the "e" and "d" cross into a lemniscata (infinity sign), the infinity symbol many in the autistic community prefer. Real vector at public/marca/logo-edivertido-vetorial-sem-fundo.svg and logo-edivertido-vetorial-fiel.svg.
- Brand colors from the logo: navy, orange, green.
- Puzzle pieces ARE the visual language of the site, by explicit client decision (2026-10-02): "colorful puzzle, fun and lively, brand colors only". This overrides the older ban in CLAUDE.md.
- Identity-first, respectful language: "pessoa autista", "neurodivergente"; never "portador", "sofre de", "criança especial", "normal".

## Evidence on Hand

- Real photos, with image authorization confirmed (including the specific one for the distress photo): public/marca/01.jpeg (waiting room with pool table), 02.jpeg (child in distress on the floor during a cut, held by a companion), 03.jpeg (child lying on the floor mid-cut, sensory panel behind), 04.jpeg (kids in the sensory waiting room), 05.jpeg (barber thumbs-up next to a smiling kid in a toy car after the cut).
- Google Business Profile: 5.0 stars, 84 reviews.
- 5 years in operation; more than 2,000 services (client's own figure, a floor not an exact count).
- Must not be fabricated: testimonials, video, objection answers, therapist credentials, any other number.

## Product Principles

1. Proof over promise: real photos and real numbers carry the argument; nothing invented.
2. WhatsApp is always one tap away.
3. Respect, not pity or heroism; calm competence.
4. The visitor controls the stimulation: the "Tirar ruído" switch is a product feature, not a theme toggle.

## Accessibility & Inclusion

WCAG 2.2 AA. Visible keyboard focus, readable contrast, 200% zoom without horizontal scroll, reduced motion respected. "Tirar ruído" mode must also remove all non-essential motion.
