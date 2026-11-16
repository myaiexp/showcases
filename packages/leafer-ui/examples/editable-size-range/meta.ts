// leafer-ui example: Editable: widthRange and heightRange limit resizing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editable: widthRange and heightRange limit resizing",
  summary: "widthRange and heightRange ({ min, max }) clamp the size a single selected element can be resized to in the editor. The card drags the corner handle far out and then far in; the readout shows the size staying in range.",
  section: "Interaction",
  tags: ["widthRange","heightRange","editable","editor","IRangeSize"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/editable.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
