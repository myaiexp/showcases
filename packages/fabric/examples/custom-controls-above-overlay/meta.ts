// fabric example: Customization: controlsAboveOverlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Customization: controlsAboveOverlay',
  summary:
    'The canvas draws selection handles before its overlay and clipPath, so both hide them. Setting controlsAboveOverlay to true draws the handles last, on top.',
  section: 'Customization',
  tags: ['controlsAboveOverlay', 'overlayColor', 'clipPath', 'absolutePositioned', 'setActiveObject'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
