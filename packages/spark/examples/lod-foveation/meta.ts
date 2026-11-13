// Spark example: coneFov0, coneFov, coneFoveate and behindFoveate on SparkRenderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Foveated LoD',
  summary:
    'The camera stands in a ring of LoD torus knots and slowly turns. Within coneFov0 of the view direction the knots get full detail; out to coneFov detail falls to coneFoveate, and behind the viewer to behindFoveate, so the splat budget goes where you look. Turn behindFoveate up to see the knots behind you sharpen as the front ones coarsen.',
  section: 'Level-of-Detail',
  tags: ['coneFov0', 'coneFov', 'coneFoveate', 'behindFoveate', 'createLodSplats'],
  docs: ['repo/docs/docs/lod-getting-started.md', 'repo/docs/docs/spark-renderer.md', 'repo/docs/docs/new-features-2.0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
