// fabric example: Utilities: offscreen canvas to data URL and back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: offscreen canvas to data URL and back',
  summary:
    'util.createCanvasElement makes a canvas that is not in the page; util.toDataURL encodes it as png or jpeg and util.loadImage decodes the string into an image. Both ends are shown with a FabricImage, and jpeg quality is adjustable.',
  section: 'Utilities',
  tags: ['util.createCanvasElement', 'util.toDataURL', 'util.loadImage', 'FabricImage', 'setElement'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/createCanvasElement.md',
    'repo/src/content/docs/api/namespaces/util/functions/toDataURL.md',
    'repo/src/content/docs/api/namespaces/util/functions/loadImage.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
