// mermaid example: darkMode and derived colours from one primaryColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "darkMode and derived colours from one primaryColor",
  summary: "One primaryColor input plus darkMode on the base theme; swatches read from the rendered SVG show the secondary, tertiary, border and line colours Mermaid derived, and a hex versus colour-name test.",
  section: "Theming",
  tags: ["theming","darkMode","themeVariables","color-calculation","interactive"],
  docs: ["repo/packages/mermaid/src/docs/config/theming.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
