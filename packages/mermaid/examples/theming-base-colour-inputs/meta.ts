// mermaid example: base theme driven by colour inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Base theme driven by colour inputs",
  summary:
    "The only customisable theme, base, takes themeVariables from colour inputs and derives the rest; the preview cycles palettes.",
  section: "Theming",
  tags: ["theme","base","themeVariables","primaryColor"],
  docs: ["repo/packages/mermaid/src/docs/config/theming.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
