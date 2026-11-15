// cobe example: mapBrightness: land dot brightness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mapBrightness: land dot brightness",
  summary:
    "Land dots go from dim grey at 1 to saturated at 20 while the ocean stays dark. Only the land dots scale with mapBrightness.",
  section: 'Options',
  tags: ['mapBrightness', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
