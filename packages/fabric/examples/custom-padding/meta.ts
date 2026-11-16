// fabric example: Customization: padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: padding',
  summary:
    'padding adds space between an object and its selection frame and controls, and makes the clickable area larger by the same amount. A dotted outline shows the real bounding box.',
  section: 'Customization',
  tags: ['padding', 'hasBorders', 'aCoords', 'after:render', 'setCoords'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-4.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
