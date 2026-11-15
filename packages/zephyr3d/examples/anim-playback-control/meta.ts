// zephyr3d example: Playback handle: pause, seek, speed and fadeTo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Playback handle: pause, seek, speed and fadeTo',
  summary:
    'AnimationSet.play() returns an AnimationPlayback. The figure\'s walk clip is driven through pause, resume, seek, normalizedTime, speedRatio and fadeTo, and the handle\'s state and time are read back every frame.',
  section: 'Animation',
  tags: ['play', 'AnimationPlayback', 'pause', 'resume', 'seek', 'normalizedTime', 'speedRatio', 'fadeTo', 'state'],
  docs: ['repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
