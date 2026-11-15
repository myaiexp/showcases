// cobe example: opacity: globe body brightness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "opacity: globe body brightness",
  summary:
    "The globe body fades as opacity falls from 1 to 0, over a striped backdrop: at 0 the body and its land dots are drawn at half strength and the stripes show through, while the glow ring stays as it was. In 2.0.1 the shader scales the body by (1 + opacity) / 2, so it never disappears completely.",
  section: 'Options',
  tags: ['opacity', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
