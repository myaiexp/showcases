// Sigma.js example: image and pictogram layers from @sigma/node-image
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Images and pictograms',
  summary:
    'layerImage from @sigma/node-image clips SVG images to the node shape. Pictograms use drawingMode "color" to take the node colour, with padding; plain pictures use "image". All images are inline SVG data URLs.',
  section: 'Styling nodes',
  tags: ['layers', 'image', 'pictogram', '@sigma/node-image'],
  docs: [`${DOCS}/how-to/nodes/fill-layers.mdx`, 'repo/packages/node-image/README.md', `${DOCS}/reference/primitives-schema.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
