// globe-gl example: Points: pointLabel as HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Points: pointLabel as HTML",
  summary:
    "pointLabel's accessor may return plain text, an HTML string or an HTML element, and globe.gl shows it as the tooltip of the hovered column. Here the element is built per hover with a population bar; the full view switches between the three forms.",
  section: "Points Layer",
  tags: ["pointLabel", "HTML tooltip"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
