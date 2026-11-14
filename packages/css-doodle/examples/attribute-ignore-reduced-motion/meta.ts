// css-doodle example: The ignore-reduced-motion attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The ignore-reduced-motion attribute",
  summary:
    "css-doodle pauses its animations while prefers-reduced-motion: reduce matches. The doodle with ignore-reduced-motion keeps spinning; the other follows your system setting.",
  section: "Attributes",
  tags: ['ignore-reduced-motion', '@shape', 'prefers-reduced-motion'],
  docs: [
    'pages/css-doodle-com/reference/attribute-ignore-reduced-motion.md',
    'pages/css-doodle-com/reference/js-api-pause.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
