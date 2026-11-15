// vega example: View: Event Listeners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Event and Resize Listeners',
  summary:
    'addEventListener for click and mouseover logs the event type and the datum of the bar under the pointer, removeEventListener turns it off, and addResizeListener reports the new size when the width changes.',
  section: 'View API',
  tags: ['view.addEventListener', 'view.removeEventListener', 'view.addResizeListener', 'view.hover'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
