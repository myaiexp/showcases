// cosmos-gl example: Rescale positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rescale positions',
  summary:
    'Data in the 0 to 1 range is too small for the layout forces. rescalePositions: true maps it onto a larger area first; getScaleX and getScaleY return the mapping functions, and with false they are undefined and the points stay at their raw coordinates.',
  section: 'Configuration',
  tags: ['rescalePositions', 'getScaleX', 'getScaleY', 'setPointPositions'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
