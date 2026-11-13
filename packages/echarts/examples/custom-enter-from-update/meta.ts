// echarts example: Custom element enterFrom and updateAnimation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom element enterFrom and updateAnimation',
  summary:
    'Every few seconds a random subset of circles is drawn: kept names move to their new height, new ones enter. Each circle sets enterFrom, enterAnimation and updateAnimation. Pick how circles arrive and tune the enter and update animations; changes apply on the next update.',
  section: 'Animation',
  tags: ['custom', 'renderItem', 'transition', 'enterFrom', 'enterAnimation', 'updateAnimation'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
    'repo/contents/en/how-to/animation/transition.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
