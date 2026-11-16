// leafer-ui example: forceRender: a paint edited in place
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "forceRender: a paint edited in place",
  summary: "A gradient paint object is edited in place, which no setter notices. forceRender() redraws the element without touching layout and the new colours appear.",
  section: "Element advanced",
  tags: ["forceRender", "fill", "linear gradient"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/forceRender.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
