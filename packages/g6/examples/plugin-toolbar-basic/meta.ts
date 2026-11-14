// g6 example: Toolbar: zoom and fit buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Toolbar: zoom and fit buttons',
  summary: "The toolbar plugin renders built-in icon buttons from getItems; onClick receives each item's value and zooms or fits the graph. The card zooms on a timer in place of clicks.",
  section: 'Plugin',
  tags: ['toolbar', 'getItems', 'onClick', 'zoom-in', 'zoom-out', 'auto-fit'],
  docs: ['repo/packages/site/docs/manual/plugin/Toolbar.en.md', 'repo/packages/site/common/api/plugins/toolbar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
