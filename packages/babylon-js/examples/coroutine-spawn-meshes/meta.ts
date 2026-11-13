// babylon-js example: coroutine spawning meshes frame by frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coroutine spawning meshes frame by frame',
  summary:
    'A generator function run with onBeforeRenderObservable.runCoroutineAsync spawns a spiral of spheres one per frame, yields a Tools.DelayAsync promise to wait 1.5 seconds, then removes the spheres one per frame and starts again.',
  section: 'Events',
  tags: ['runCoroutineAsync', 'function*', 'yield', 'Tools.DelayAsync', 'onBeforeRenderObservable'],
  docs: ['repo/content/features/featuresDeepDive/events/coroutines.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
