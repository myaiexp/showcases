// observable-plot example: Tick: a tick on top of each bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tick: a tick on top of each bar',
  summary:
    'A faint bar with a tickY at its upper bound for emphasis, plus a ruleY at zero. The slider sets the tick strokeWidth.',
  section: 'Mark: Tick',
  tags: ['tickY', 'barY', 'ruleY', 'strokeWidth'],
  docs: ['repo/docs/marks/tick.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
