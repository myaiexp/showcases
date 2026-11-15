// vega example: View: Tooltip Handler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: A Custom Tooltip Handler',
  summary:
    'view.tooltip installs a handler that receives the pointer event and the tooltip value of the hovered bar and shows a styled box of your own next to the pointer instead of the browser\'s title tooltip.',
  section: 'View API',
  tags: ['view.tooltip', 'encode.tooltip', 'view.hover'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
