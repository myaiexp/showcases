// cobe example: the Performance recipe's mapSamples tiers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'mapSamples tiers',
  summary:
    "The Performance recipe's three mapSamples tiers side by side: 8000, 16000 and 40000. The land is made of more, finer dots as the number rises, but the 40000 globe loses its land south of a band, because 2.0.1's shader decodes dot indexes only up to 32767 (see the mapSamples example). The full view shows a smoothed count of milliseconds each update() call takes on the CPU, which leaves out the asynchronous GPU work.",
  section: 'Recipes',
  tags: ['mapSamples', 'devicePixelRatio', 'update'],
  docs: ['repo/website/app/components/Recipes.tsx', 'pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
