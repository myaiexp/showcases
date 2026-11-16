// fabric example: Colors: Colour from an array and getSource
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colors: Colour from an array and getSource',
  summary:
    'new Color([r, g, b, a]) builds a colour from its channels, getSource() reads them back, and Color.fromHex() is the static parser.',
  section: 'Colors',
  tags: ['Color', 'getSource', 'fromHex', 'isUnrecognised'],
  docs: ['repo/src/content/docs/api/classes/Color.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
