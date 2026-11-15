// wfc options: n (window size) and symmetry, on the README's squares sample
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'wfc windows and symmetry',
  summary:
    "The README's first sample, a hollow and a solid square, filling a 32 × 32 grid. With the defaults every 3 × 3 window of the grid appears in the sample; n: 2 compares 2 × 2 windows, so it copies less of the sample, and symmetry: 1 takes the sample only as drawn, with no turns or flips.",
  section: 'Addons',
  tags: ["wfc", "@wfc", "n", "symmetry", "legend"],
  docs: ["repo/src/wfc/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
