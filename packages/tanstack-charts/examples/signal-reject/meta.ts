// tanstack-charts example: Rejecting a proposed value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rejecting a proposed value',
  summary:
    'A controlled signal only proposes: the application decides what to keep. This handle may move up to week 5 but the application refuses anything later, so a keyboard step to week 6 is proposed, ignored, and the handle stays put. The readout shows each proposal and the verdict.',
  section: 'Interactions and Selections',
  tags: ['controlledSignal', 'handleX', 'reason', 'commit', 'controlled state'],
  docs: ['repo/docs/guides/interactions-and-selections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
