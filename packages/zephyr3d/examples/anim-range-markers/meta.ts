// zephyr3d example: Playing part of a clip: range with seconds, frames and markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playing part of a clip: range with seconds, frames and markers',
  summary:
    'PlayAnimationOptions.range takes a start and an end as seconds, as { frame } converted with the clip\'s frame rate, or as { marker } names added with addMarker. Pick a range and the walk loops only that slice.',
  section: 'Animation',
  tags: ['range', 'AnimationTimeRef', 'frame', 'marker', 'addMarker', 'frameRate'],
  docs: ['repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
