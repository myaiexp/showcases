// force-graph example: Data input: linkSource and linkTarget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data input: linkSource and linkTarget',
  summary:
    'linkSource(\'from\') and linkTarget(\'to\') make the graph read each link\'s ends from the from and to attributes instead of source and target. Arrows and particles run from the from end to the to end.',
  section: 'Data input',
  tags: ['linkSource', 'linkTarget', 'graphData', 'linkLabel', 'linkDirectionalArrowLength', 'linkDirectionalParticles'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
