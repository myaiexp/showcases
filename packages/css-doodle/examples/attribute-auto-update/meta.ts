// css-doodle example: The auto:update attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The auto:update attribute",
  summary:
    "auto:update=\"2s\" redraws the doodle on a fixed interval (minimum 500ms); numbers fly to new places and spin. Change the interval or remove the attribute to stop it.",
  section: "Attributes",
  tags: ['auto:update', 'update()', '@place', '@pd'],
  docs: [
    'pages/css-doodle-com/reference/attribute-auto-update.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
