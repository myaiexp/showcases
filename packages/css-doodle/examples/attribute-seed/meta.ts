// css-doodle example: The seed attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The seed attribute",
  summary:
    "Two doodles with the same code: the left has seed=\"2025\" and never changes, the right has none and draws a new picture on every update(). Type a seed to set it from JavaScript and read back the seed in use.",
  section: "Attributes",
  tags: ['seed', 'seed (JS)', '@r', '@p', 'update()'],
  docs: [
    'pages/css-doodle-com/reference/attribute-seed.md',
    'pages/css-doodle-com/reference/property-seed.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
