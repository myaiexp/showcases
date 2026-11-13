// Utilities example: Utils set() and revert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utils set() and revert',
  summary: 'set() applies radius, offset, staggered scale and colour to a row of squares in one call, and the returned instance reverts them. The preview toggles it automatically; the full view has Set and Revert buttons and a readout of what get() reads back.',
  section: 'Utilities',
  tags: ['utils.set', 'revert', 'stagger'],
  docs: [
    'pages/animejs-com/documentation/utilities/set.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
