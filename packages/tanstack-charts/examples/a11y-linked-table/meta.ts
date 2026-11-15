// tanstack-charts example: Chart and table share one selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart and table share one selection',
  summary:
    'A keyed selection is controlled by the application, so a point on the chart and a button in a semantic table select the same row. The status text, a clear button and aria-pressed come from the same selected key. Selection is never inferred from DOM nodes.',
  section: 'Accessibility',
  tags: ['keyedSelection', 'whenSelected', 'controlledSignal', 'selection'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/reference/dom-host.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
