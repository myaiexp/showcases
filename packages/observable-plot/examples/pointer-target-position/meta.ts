// observable-plot example: Pointer: px and py targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: px and py targets',
  summary:
    'px and py set the pointing target apart from where a mark draws: a rule, a dot and a text readout all follow the focused date.',
  section: 'Interaction: Pointer',
  tags: ['ruleX', 'dot', 'text', 'pointerX', 'px', 'py'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
