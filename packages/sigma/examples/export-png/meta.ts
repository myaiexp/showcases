// Sigma.js example: downloading the graph as an image with @sigma/export-image
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Export the graph as an image',
  summary:
    'Buttons call downloadAsImage with png and jpeg formats and a background color. Gallery cards instead render the export with drawOnCanvas into a thumbnail beside the moving graph.',
  section: 'Technical guides',
  tags: ['@sigma/export-image', 'downloadAsImage', 'drawOnCanvas', 'png'],
  docs: [`${DOCS}/how-to/technical/export-image.mdx`, 'repo/packages/export-image/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
