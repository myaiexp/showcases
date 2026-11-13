// Pretext example: truncate file paths in the middle with an ellipsis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Truncate in the middle',
  summary:
    "Paths are cut to a width by keeping their start and end around '…'. A binary search over candidate strings, each sized with prepare() and measureNaturalWidth(), finds the most characters that fit.",
  section: 'Manual line layout',
  tags: ['measureNaturalWidth', 'prepare', 'ellipsis', 'truncate'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
