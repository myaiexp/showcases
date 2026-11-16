// fabric example: Extensions: cropping controls on a flipped image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: cropping controls on a flipped image',
  summary:
    'createImageCroppingControls() assigned to an image\'s controls, with flipX and flipY toggles. The extension wraps its handlers with withFlip, so dragging an edge crops the side you grab whether or not the picture is mirrored.',
  section: 'Extensions',
  tags: ['createImageCroppingControls', 'withFlip', 'flipX', 'flipY', 'cropX', 'FabricImage'],
  docs: [
    'repo/extensions/README.MD',
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/classes/Control.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
