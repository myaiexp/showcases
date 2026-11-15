// cobe example: arcHeight: how high arcs bulge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "arcHeight: how high arcs bulge",
  summary:
    "Three arcs flatten against the surface at 0.1 and bow far out at 0.5 as arcHeight sweeps. The arcs are passed again in every update, because the height is baked into each arc when it is sent.",
  section: 'Options',
  tags: ['arcHeight', 'update()', 'arcs'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
