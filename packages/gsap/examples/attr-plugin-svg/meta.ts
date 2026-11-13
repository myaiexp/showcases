// gsap example: Attr plugin on SVG geometry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Attr plugin on SVG geometry",
  summary:
    "The attr object tweens SVG geometry (x, y, width, height, a percentage width) while x outside it moves the CSS transform. A readout shows the two x values staying separate.",
  section: "Core plugins",
  tags: ["attr", "AttrPlugin", "SVG"],
  docs: [
    "pages/gsap-com/docs/v3/GSAP/CorePlugins/Attributes.md",
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
