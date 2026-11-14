// Zdog example: Rounded phone, a phone built from RoundedRects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rounded phone',
  summary:
    'A phone made only of rounded rectangles: the body, the screen, the notch, a dock and nine app icons. The cornerRadius option sets how round the corners are, and one slider changes it for everything at once, from sharp corners to a pill.',
  section: 'Shapes',
  tags: ['RoundedRect', 'cornerRadius', 'width', 'height', 'updatePath', 'copy'],
  docs: ['repo/modules/docs/shapes-basic.hbs', 'repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
