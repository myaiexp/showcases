// leafer-ui example: Box: size adapts to its content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Box: size adapts to its content",
  summary:
    "A Box without width or height wraps its content: here a Text child with padding decides the size, and the corner radius and fill come from the Box. The text changes length and the Box follows.",
  section: "Group elements",
  tags: ['Box', 'children', 'Text', 'padding', 'cornerRadius', 'isAutoWidth'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Box.md',
    'pages/www-leaferjs-com/ui/en/reference/display/Text.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
