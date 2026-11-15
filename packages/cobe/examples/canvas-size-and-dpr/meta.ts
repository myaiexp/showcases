// cobe example: width, height and devicePixelRatio together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'width, height and devicePixelRatio',
  summary:
    'Three globes in canvases shown at the same CSS size, each captioned with its canvas backing size. cobe sets canvas.width to width times devicePixelRatio, so dpr 1, dpr 2 and the docs\' "size * 2 with dpr 2" give 1x, 2x and 4x the pixels; the sweep changes the size and the extra pixels show as a sharper dot edge.',
  section: 'Options',
  tags: ['width', 'height', 'devicePixelRatio', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
