// fabric example: Customization: border style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: border style',
  summary:
    'The selection frame is drawn from borderColor, borderScaleFactor (line width) and borderDashArray on the object itself. Pick another dash pattern or colour and the frame redraws.',
  section: 'Customization',
  tags: ['borderColor', 'borderScaleFactor', 'borderDashArray', 'hasBorders', 'setActiveObject'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
