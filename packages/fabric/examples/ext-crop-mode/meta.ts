// fabric example: Extensions: crop an image with enterCropMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: crop an image with enterCropMode',
  summary:
    'enterCropMode from fabric/extensions swaps an image\'s controls for cropping ones on double-click: edge and corner handles crop, outer squares scale, and dragging pans the picture behind the frame. A second double-click leaves crop mode.',
  section: 'Extensions',
  tags: ['enterCropMode', 'createImageCroppingControls', 'cropX', 'cropY', 'FabricImage', 'mousedblclick'],
  docs: [
    'repo/extensions/README.MD',
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/classes/Control.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
