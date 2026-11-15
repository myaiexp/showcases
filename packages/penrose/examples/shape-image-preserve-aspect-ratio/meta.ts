// penrose example: Image preserveAspectRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image preserveAspectRatio',
  summary:
    'The flag is 160 by 100 but its Image box is 120 by 160. `preserveAspectRatio : "xMidYMid meet"` fits it whole inside the box, `slice` fills the box and crops the flag, and `none` stretches it. A dashed rectangle marks the box.',
  section: 'Shape: Image',
  tags: ['Image', 'preserveAspectRatio', 'width', 'height'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/image.md',
    'repo/packages/core/src/shapes/Image.ts',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
