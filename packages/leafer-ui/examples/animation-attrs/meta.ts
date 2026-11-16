// leafer-ui example: Animation: attrs filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: attrs filter",
  summary: "animation.attrs lists the style keys that tween; the other keys of the style are not interpolated and only switch when a run starts or ends. Both lanes get the same style (x, fill, cornerRadius) and swing; only one lets the colour and corners fade.",
  section: "Element animation",
  tags: ["animation", "attrs", "IAnimateOptions"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/animation.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
