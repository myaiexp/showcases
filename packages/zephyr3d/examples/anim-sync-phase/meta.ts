// zephyr3d example: Phase synchronisation: starting run at walk's phase
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Phase synchronisation: starting run at walk\'s phase',
  summary:
    'Two figures switch from walk to run together. The left one starts run from zero; the right one passes sync: { target: \'walk\' } so run begins at the same fraction of the stride. Both readouts show the phase.',
  section: 'Animation',
  tags: ['sync', 'AnimationPlaybackSyncOptions', 'normalizedTime', 'fadeIn', 'stopAnimation'],
  docs: ['repo/apps/doc/web/en/animation-intro.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
