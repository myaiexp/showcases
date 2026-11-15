// cobe example: baseColor: globe tint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "baseColor: globe tint",
  summary:
    "The globe body changes colour as baseColor cycles through white, blue, orange and green; the caption shows the [r, g, b] triple. In light mode (dark 0) the whole ball takes the tint.",
  section: 'Options',
  tags: ['baseColor', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
