// leafer-ui example: Shadow: box-shadow mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow: box-shadow mode",
  summary: "With box: true the outer shadow is drawn only outside the shape, like CSS box-shadow, so it does not show through a translucent fill. The checkbox switches it.",
  section: "Appearance",
  tags: ["shadow","box","ShadowEffect","cornerRadius"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/shadow.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/Effect.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
