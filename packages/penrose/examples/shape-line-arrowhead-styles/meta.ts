// penrose example: Line arrowhead styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line arrowhead styles',
  summary:
    'The eight named arrowheads of a Line: `straight`, `concave`, `perp`, `line`, `doubleLine`, `loopup`, `loopdown` and `loop`. Each row is a thick Line with only `endArrowhead` changed; a pinned `ensure dx == 0` makes the rows slide in from a sampled position.',
  section: 'Shape: Line',
  tags: ['Line', 'endArrowhead', 'arrowhead', 'Text', 'textAnchor'],
  // The arrowhead style names are defined in Util.ts (the Line page embeds a trio instead).
  docs: [
    'repo/packages/docs-site/docs/ref/style/shapes/line.md',
    'repo/packages/core/src/shapes/Line.ts',
    'repo/packages/core/src/utils/Util.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
