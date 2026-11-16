// leafer-ui example: Box: textBox editing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box: textBox editing",
  summary:
    "With textBox: true and the text-editor plugin, double-clicking a Box in the editor edits the Text child inside it, as in an input field or sticky note; resizeChildren scales the text too. The card selects, then double-taps.",
  section: "Group elements",
  tags: ['Box', 'textBox', 'resizeChildren', 'editable', '@leafer-in/text-editor'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Box.md',
    'pages/www-leaferjs-com/ui/en/reference/display/Text.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
