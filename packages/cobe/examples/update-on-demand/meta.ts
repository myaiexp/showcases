// cobe example: update() draws one frame, with no loop at all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'update() draws one frame',
  summary:
    'A globe with no animation loop. It changes only when update() is called: in the card a timer calls it every 0.7 s, so the globe jumps a step at a time; in the full view each slider move calls it once. The badge counts the frames drawn.',
  section: 'Methods',
  tags: ['update', 'createGlobe', 'phi', 'theta'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
