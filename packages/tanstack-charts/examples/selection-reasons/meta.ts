// tanstack-charts example: Select, clear, pointer and keyboard reasons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select, clear, pointer and keyboard reasons',
  summary:
    'The controlled signal receives a reason with every proposal: select or clear, and whether it came from the pointer or the keyboard. A click on blank space proposes a clear. The log lists the reasons as they arrive; Tab to the chart and press Enter to see a keyboard select.',
  section: 'Interactions and Selections',
  tags: ['keyedSelection', 'controlledSignal', 'KeyedSelectionChange', 'reason', 'source'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
