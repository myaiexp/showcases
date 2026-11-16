// fabric example: Utilities: findScaleToFit and findScaleToCover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: findScaleToFit and findScaleToCover',
  summary:
    'util.findScaleToFit and findScaleToCover compute the scale that fits a picture inside a frame or covers it. Resize the frame and switch between letterboxed and clipped results.',
  section: 'Utilities',
  tags: ['util.findScaleToFit', 'util.findScaleToCover', 'FabricImage', 'clipPath'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/findScaleToFit.md',
    'repo/src/content/docs/api/namespaces/util/functions/findScaleToCover.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
