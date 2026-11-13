// Spark example: tuning LoD detail with lodSplatScale and lodRenderScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'lodSplatScale and lodRenderScale',
  summary:
    'The two LoD dials the docs suggest turning. lodSplatScale multiplies the splat budget (2.0 means twice the base count), which trades detail for frame rate everywhere at once. lodRenderScale sets the smallest on-screen size a chosen splat may have, in pixels: raise it and distant hills stop spending splats on detail you can’t see.',
  section: 'Level-of-Detail',
  tags: ['lodSplatScale', 'lodRenderScale', 'lodSplatCount', 'createLodSplats'],
  docs: ['repo/docs/docs/lod-getting-started.md', 'repo/docs/docs/spark-renderer.md', 'repo/docs/docs/new-features-2.0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
