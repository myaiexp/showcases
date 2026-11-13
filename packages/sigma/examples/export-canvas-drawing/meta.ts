// Sigma.js example: drawOnCanvas post-processing and the withTempRenderer middleware
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Drawing on the exported canvas',
  summary:
    'drawOnCanvas returns a plain canvas that gets a 2D-context watermark, while a withTempRenderer middleware changes node state on the temporary renderer before it is drawn. Results are shown in an img.',
  section: 'Technical guides',
  tags: ['@sigma/export-image', 'drawOnCanvas', 'withTempRenderer', 'canvas 2d'],
  docs: [`${DOCS}/how-to/technical/export-image.mdx`, 'repo/packages/export-image/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
