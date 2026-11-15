// css-doodle example: A wave from time and index
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A wave from time and index',
  summary:
    '@t is the milliseconds since the doodle rendered, kept current by a CSS animation. The operations @t(/30, +@i(*8), %360deg) add an offset per cell and wrap the angle, and sin() turns it into a wave.',
  section: 'Cell functions',
  tags: ['@t', '@i', 'sin', 'translate', 'animation'],
  docs: [
    'pages/css-doodle-com/reference/function-t.md',
    'pages/css-doodle-com/reference/function-i.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
