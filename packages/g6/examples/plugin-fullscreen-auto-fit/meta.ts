// g6 example: Fullscreen: autoFit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fullscreen: autoFit',
  summary: 'autoFit decides whether the canvas resizes to the screen when the page goes fullscreen. The full view toggles it and logs the graph size on enter and exit.',
  section: 'Plugin',
  tags: ['fullscreen', 'autoFit', 'onEnter', 'onExit', 'getSize'],
  docs: ['repo/packages/site/docs/manual/plugin/Fullscreen.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
