// cobe example: phi: horizontal rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "phi: horizontal rotation",
  summary:
    "The globe turns once around its vertical axis while the caption counts phi from 0 to 2π, in radians and degrees. Phi is the horizontal rotation; the full view has a slider that sets it directly.",
  section: 'Options',
  tags: ['phi', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
