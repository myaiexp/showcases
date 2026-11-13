// echarts example: Animation duration, delay and easing callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation duration, delay and easing callbacks',
  summary:
    'Bars that grow with animationDuration and animationDelay given as numbers or as callbacks of the data index, with a choice of animationEasing and an animationThreshold that switches animation off for big charts. Replay the first animation or update the data to see the Update variants.',
  section: 'Option: global',
  tags: ['animation', 'animationDuration', 'animationDelay', 'animationEasing', 'animationThreshold', 'animationDurationUpdate', 'animationDelayUpdate', 'animationEasingUpdate'],
  docs: ['repo/en/option/option.md', 'repo/en/option/partial/animation.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
