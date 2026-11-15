// css-doodle example: The seed attribute against @seed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The seed attribute against @seed",
  summary:
    "Two doodles with seed=\"2025\", one of them also writing @seed: 1234567 in its code. When both are present the property wins, so the two draw different but individually fixed pictures.",
  section: "Attributes",
  tags: ['seed', '@seed', '@p', '@r'],
  docs: [
    'pages/css-doodle-com/reference/attribute-seed.md',
    'pages/css-doodle-com/reference/property-seed.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
