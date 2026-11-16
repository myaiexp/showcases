// leafer-ui example: Editor: rotateOf() to an absolute angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: rotateOf() to an absolute angle",
  summary: "Because rotateOf() is incremental, rotating to a target angle subtracts the current rotation: rotateOf('center', 45 - rect.rotation).",
  section: 'Graphic editor',
  tags: ["Editor","rotateOf","rotation"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/transform.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
