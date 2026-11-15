// cobe example: markerColor: default marker colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "markerColor: default marker colour",
  summary:
    "Three markers change colour together as markerColor cycles, while the Tokyo marker stays yellow because its own color overrides the default.",
  section: 'Options',
  tags: ['markerColor', 'update()', 'markers'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
