// lathe*3 and n inside the outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "lathe*3 and n inside the outline",
  summary: "The outline reads the n of its own copies, so lathe*3 { circle { r: .1n } } gives three sizes. Each copy is moved with move to sit side by side; the colors come from n too.",
  section: "Scenes",
  tags: ["@scene", "lathe*3", "n", "circle"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
