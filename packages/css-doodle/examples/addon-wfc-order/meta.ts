// wfc: @wfc.order() gives when each cell was decided, from 0 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filling in solve order',
  summary:
    "The README's line and corner tiles, plus an empty one, solved on a 16 × 16 grid. @wfc.order() is when the solver decided each cell, from 0 to 1; used as an animation delay it makes the doodle fill in the order it was solved, spreading out from the first choice. Each new seed solves and draws again.",
  section: 'Addons',
  tags: ["wfc", "@wfc.order", "@wfc.tiles", "animation-delay"],
  docs: ["repo/src/wfc/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
