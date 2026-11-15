// tanstack-charts example: Legend buttons expose pressed state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend buttons expose pressed state',
  summary:
    'interactiveColorLegend renders native buttons inside a named group, each with aria-pressed. The readout lists them as the DOM has them. Toggling a series updates aria-pressed, and the buttons keep their focus across the controlled update.',
  section: 'Accessibility',
  tags: ['interactiveColorLegend', 'controlledSignal', 'aria-pressed', 'itemAriaLabel'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
