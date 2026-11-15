// Named rows are variables: k: .3 and c: #f06
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Named rows are variables: k: .3 and c: #f06",
  summary: "Any other name declares a variable for the rows and shapes of its block, such as k: .3 or c: #f06. Here one size k and one color c are written once and read by three shapes, and the view is the only thing that moves.",
  section: "Scenes",
  tags: ["@scene", "variables", "sphere", "torus"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
