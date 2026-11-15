// cobe example: arcWidth: arc thickness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "arcWidth: arc thickness",
  summary:
    "Three arcs thicken from hairlines at 0.1 to wide ribbons at 2 as arcWidth sweeps. The arcs are passed again in every update, because cobe only bakes the new width into them on the next arcs update.",
  section: 'Options',
  tags: ['arcWidth', 'update()', 'arcs'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
