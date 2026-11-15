// tanstack-charts example: Selection controller, then onSelect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selection controller, then onSelect',
  summary:
    'A click or Enter hands the focused point to the selection controller first and to the onSelect callback after it. The log shows the two in order, with the controlled signal reason on the first line. Both exist so an application can mix keyed selection with its own callback.',
  section: 'Focus and Interaction',
  tags: ['keyedSelection', 'onSelect', 'controlledSignal', 'order'],
  docs: ['repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
