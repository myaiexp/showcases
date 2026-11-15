// lathe { text: 'abc' }: turning every letter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "lathe { text: 'abc' }: turning every letter",
  summary: "In a lathe the x = 0 of a path is the axis and text starts at it, so lathe { text: 'abc' } turns every letter and leaves a rounded relief. The view turns to show it.",
  section: "Scenes",
  tags: ["@scene", "lathe", "text"],
  docs: ['pages/css-doodle-com/reference/function-scene.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
