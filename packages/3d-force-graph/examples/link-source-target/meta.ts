// 3d-force-graph example: Data input: linkSource and linkTarget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: linkSource and linkTarget',
  summary:
    'linkSource and linkTarget name the link fields that hold the end nodes, so data shaped as { from, to } needs no conversion. The readout shows a link after the graph has read it.',
  section: 'Data input',
  tags: ['linkSource', 'linkTarget', 'nodeLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
