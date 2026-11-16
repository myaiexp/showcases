// fabric example: Extensions: resize controls with scale to cover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: resize controls with scale to cover',
  summary:
    'createImageResizeControlsWithScaleToCover() gives an image four edge handles that grow the visible frame while hidden picture remains and then scale the picture up to keep covering it.',
  section: 'Extensions',
  tags: ['createImageResizeControlsWithScaleToCover', 'changeWidthAndScaleToCover', 'FabricImage', 'cropX'],
  docs: [
    'repo/extensions/README.MD',
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/classes/Control.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
