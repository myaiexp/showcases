// cobe example: diffuse: lighting falloff
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "diffuse: lighting falloff",
  summary:
    "Land dots are brightest at the centre of the disc and fade toward the edge; as diffuse rises they fade faster, so the lit area shrinks to a spot in the middle. Low values keep the dots bright almost to the rim.",
  section: 'Options',
  tags: ['diffuse', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
