// leafer-ui example: Editor: element is the selection's one representative
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor: element is the selection's one representative",
  summary: "For one selected rect, editor.element is that rect; for several it is a proxy element that matches the edit box, so its x, y and size change.",
  section: 'Graphic editor',
  tags: ["Editor","element","simulateTarget","multiple"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
