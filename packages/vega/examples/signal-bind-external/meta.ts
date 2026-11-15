// vega example: Signal: Bind to an External Input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Signal: Bind to an External Input',
  summary:
    'A slider created by the page, not by Vega, drives a bar through bind.element and bind.event. Clicking the chart sets the signal and Vega writes the value back into the slider.',
  section: 'Signals',
  tags: ['signal.bind.element', 'signal.bind.event', 'signal.on'],
  docs: ['repo/docs/docs/signals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
