// penrose example: Image scene by type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image scene by type',
  summary:
    'A Domain with `House`, `Tree` and `Cloud` types under `Scenery` gets one Style rule per type, each making an Image with its own `href`. The vertical positions are pinned, so the optimizer only slides the pictures sideways until none overlap.',
  section: 'Shape: Image',
  tags: ['Image', 'href', 'center', 'subtype'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/image.md', 'repo/packages/core/src/shapes/Image.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
