// cobe example: the Cleanup recipe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cleanup',
  summary:
    'A globe is created, spins, and is destroyed again, while a badge counts globes created and globes still live. The card cycles on its own; the full view has Mount and Unmount buttons. Unmount calls destroy() and stops the update() loop.',
  section: 'Recipes',
  tags: ['destroy', 'createGlobe', 'update'],
  docs: ['repo/website/app/components/Recipes.tsx', 'pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
