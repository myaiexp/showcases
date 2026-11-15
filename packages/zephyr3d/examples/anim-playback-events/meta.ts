// zephyr3d example: Playback events and clip markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playback events and clip markers',
  summary:
    'A footstep marker is added to the walk clip with clip.addMarker, then the playback\'s start, loop, marker and stop events are listened to. The wave clip plays twice to show loop, complete and stop with their reason.',
  section: 'Animation',
  tags: ['addMarker', 'AnimationMarker', 'playback.on', 'marker', 'loop', 'complete', 'stop'],
  docs: ['repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
