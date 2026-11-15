// d2 example: Classes: attributes win
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Classes: attributes win',
  summary:
    'When a shape sets an attribute that its class also sets, the shape\'s own value wins. The class here says red, the shape says orange, and the shape renders orange.',
  section: 'Classes',
  tags: ['classes', 'override'],
  docs: ['repo/docs/tour/classes.md', 'repo/static/d2/style-classes-2.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
