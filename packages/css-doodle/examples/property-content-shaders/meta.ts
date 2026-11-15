// css-doodle example: @content: @shaders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@content: @shaders",
  summary:
    "A cell can hold a canvas: @shaders compiles the fragment shader that follows and draws it with u_time, so this tunnel of colour keeps turning.",
  section: "Properties",
  tags: ['@content', '@shaders'],
  docs: [
    'pages/css-doodle-com/reference/property-content.md',
    'pages/css-doodle-com/reference/function-shaders.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
