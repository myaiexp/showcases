// leafer-ui example: BlendMode: pass-through versus normal on a Group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BlendMode: pass-through versus normal on a Group",
  summary: "In a pass-through Group (the default) children blend with the canvas below; a \"normal\" Group renders on its own layer first, so the multiply inside only meets the Group's own contents. Both Groups hold the same multiply rect over stripes.",
  section: "Appearance",
  tags: ["blendMode","pass-through","normal","Group","multiply"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/blendMode.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/BlendMode.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
