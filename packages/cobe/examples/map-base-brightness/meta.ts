// cobe example: mapBaseBrightness: ocean dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mapBaseBrightness: ocean dots",
  summary:
    "At 0 only the land is lit and the ocean is empty. As mapBaseBrightness rises, the ocean fills with dots at the same lattice and the continents blend into them.",
  section: 'Options',
  tags: ['mapBaseBrightness', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
