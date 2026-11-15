// penrose example: Canvas preamble
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Canvas preamble sets the page size',
  summary:
    'Every Style program opens with a `canvas` block that fixes the drawing width and height. The same sets are laid out on a 400 by 300, a 600 by 600 and a 800 by 450 canvas, and the frame follows the size because it reads `canvas.width` and `canvas.height` with the dot operator.',
  section: 'Style: Namespaces',
  tags: ['canvas', 'namespace', 'width', 'height'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/namespaces.md',
    'repo/packages/core/src/lib/Functions.ts',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
