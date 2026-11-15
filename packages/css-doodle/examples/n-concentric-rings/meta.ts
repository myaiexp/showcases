// css-doodle example: Concentric rings from @n
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Concentric rings from @n',
  summary:
    'Ten steps each emit a random color stop at @n(*10%) and a transparent stop that ends that ring, so the gradient is ten concentric rings of random colors.',
  section: 'Sequence',
  tags: ['@n', '@m', '@p', 'radial-gradient'],
  docs: [
    'pages/css-doodle-com/reference/function-n.md',
    'pages/css-doodle-com/reference/function-p.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
