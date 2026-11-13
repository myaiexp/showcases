// gsap example: Tweening CSS variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tweening CSS variables",
  summary:
    "A colour and a length stored in CSS custom properties are tweened on one element, and every rule that reads them updates. A readout shows the variable through gsap.getProperty().",
  section: "Core plugins",
  tags: ["CSS variables", "custom properties", "CSSPlugin"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/CorePlugins/CSS.md",
    "pages/gsap-com/docs/v3/GSAP/gsap-getProperty-.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
