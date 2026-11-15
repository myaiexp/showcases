// zephyr3d example: Waiting on a playback: waitForComplete and completionFadeOut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waiting on a playback: waitForComplete and completionFadeOut',
  summary:
    'An async function chains wave, jump and idle by awaiting playback.waitForComplete(). completionFadeOut keeps each finished clip fading out while the next one starts, so the poses blend instead of snapping.',
  section: 'Animation',
  tags: ['waitForComplete', 'waitForMarker', 'completionFadeOut', 'repeat', 'playAnimation'],
  docs: ['repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
