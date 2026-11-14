// Zdog example: easeInOut powers compared on four flipping cards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ease in, ease out',
  summary:
    'Four cards turn on the same clock, but each eases differently: the first turns at a constant speed, the others start slow, rush through the middle and settle. Zdog.easeInOut(alpha, power) bends a 0–1 progress value, and a higher power means a snappier turn.',
  section: 'API: Utilities',
  tags: ['easeInOut', 'TAU', 'backface', 'animation'],
  docs: ['repo/modules/docs/api-utils.hbs', 'repo/modules/docs/api-shape.hbs', 'repo/modules/docs/shapes-basic.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
