// leafer-ui example: BlendMode: the compositing modes in isolated Groups
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BlendMode: the compositing modes in isolated Groups",
  summary: "source-in, destination-out, xor and the other compositing modes work against whatever is already drawn, so each pair lives in its own Group with blendMode \"normal\" to keep the rest of the canvas out of it.",
  section: "Appearance",
  tags: ["blendMode","source-in","destination-out","xor","copy","Group"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/blendMode.md",
    "pages/www-leaferjs-com/ui/en/reference/interface/ui/BlendMode.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
