// zephyr3d example: AnimationController: layered upper and lower body with sync
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnimationController: layered upper and lower body with sync',
  summary:
    'A layered state loops a lower-body run and an upper-body run synchronised through sync: { target }. A wave response replaces only the upper layer and restores it at the lower body\'s phase; a dodge response fades the whole state out and returns to it.',
  section: 'Animation',
  tags: ['sync', 'stop', 'id', 'parallel', 'emit', 'returnTo', 'onActive', 'createSkeletalMaskedAnimation'],
  docs: ['repo/apps/doc/web/en/animation-controller.md', 'repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
