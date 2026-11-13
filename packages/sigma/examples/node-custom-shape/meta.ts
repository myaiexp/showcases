// Sigma.js example: a custom SDF node shape written in GLSL
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'A custom node shape',
  summary:
    'Implement the SDFShape interface with a GLSL signed distance function to add a heart next to the built-in circle. Nodes flip between the two and the centre heart beats.',
  section: 'Styling nodes',
  tags: ['shapes', 'sdf', 'glsl', 'custom'],
  docs: [`${DOCS}/how-to/nodes/shapes.mdx`, `${DOCS}/reference/primitives-schema.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
