// echarts example: stateAnimation duration and easing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'stateAnimation duration and easing',
  summary:
    'How long a bar takes to switch to its emphasis state. The first series follows the root stateAnimation, the second sets its own. Change duration and easing, or highlight a pair of bars from code and watch the two series diverge.',
  section: 'Option: global',
  tags: ['stateAnimation', 'stateAnimation.duration', 'stateAnimation.easing', 'emphasis', 'dispatchAction'],
  docs: ['repo/en/option/option.md', 'repo/en/option/partial/state-animation.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
