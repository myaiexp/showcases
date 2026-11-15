// css-doodle example: @pn and @pnr together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@pn and @pnr together',
  summary:
    '@pnr goes through the same list backwards. The odd rows use @pn and the even rows @pnr, picked with @cell(y % 2 = ...), so the shading alternates direction.',
  section: 'Random',
  tags: ['@pn', '@pnr', '@cell', 'opacity'],
  docs: [
    'pages/css-doodle-com/reference/function-pn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
