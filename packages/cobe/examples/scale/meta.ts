// cobe example: scale: globe size multiplier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale: globe size multiplier",
  summary:
    "The globe shrinks to half size and grows past the canvas as scale sweeps from 0.5 to 2.4. Beyond about 1.25 the globe is wider than the canvas (dashed line), so its edges are clipped.",
  section: 'Options',
  tags: ['scale', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
