// zephyr3d example: AnimationController: waiting for clip markers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnimationController: waiting for clip markers',
  summary:
    'A jump response plays the clip under a local id and uses waitMarker steps to turn authored timing into events: an apex marker lights a lamp, an end marker returns to idle. Markers are added to the clip with addMarker.',
  section: 'Animation',
  tags: ['waitMarker', 'addMarker', 'emit', 'id', 'target', 'controller.on emit'],
  docs: ['repo/apps/doc/web/en/animation-controller.md', 'repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
