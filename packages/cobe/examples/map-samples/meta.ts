// cobe example: mapSamples: dot count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mapSamples: dot count",
  summary:
    "The land is drawn with 1000 dots at one end of the sweep and 100000 at the other, going from a few coarse blobs to a dense stipple. Past 32768 the land disappears south of a band, because 2.0.1's shader decodes dot indexes only up to 32767 and counts them from the north pole: at 100000 only the top third of the globe has land.",
  section: 'Options',
  tags: ['mapSamples', 'update()'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
