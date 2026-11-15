// polygon { text: A }: a solid letter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "polygon { text: A }: a solid letter",
  summary: "Both polygon and lathe take text, or path, as @shape does, so polygon { text: A; depth: .3 } is a solid letter. The variants extrude different letters and words.",
  section: "Scenes",
  tags: ["@scene", "polygon", "text", "depth"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
