// cobe example: destroy(), what it removes and what it keeps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'destroy()',
  summary:
    "Three labelled markers until destroy() runs. Then the globe stops redrawing and freezes on its last frame, the anchor elements are removed, so the labels drop out of place, and the badge reports that the WebGL context is still alive: in 2.0.1 destroy() deletes buffers and shaders but does not release the context the docs say it does. Creating again frees that context first and starts on a fresh canvas.",
  section: 'Methods',
  tags: ['destroy', 'createGlobe', 'id', '--cobe-{id}'],
  docs: ['pages/cobe-vercel-app.md', 'repo/website/app/components/Recipes.tsx', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
