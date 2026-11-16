// leafer-ui example: Flow: inFlow false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Flow: inFlow false",
  summary: "A child with inFlow: false leaves the layout and keeps its own x and y, here a tile below the flow. The checkbox (a card flips it) puts it back into the flow.",
  section: "Auto layout",
  tags: ["Flow", "inFlow", "around", "Box", "@leafer-in/flow"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/flow/Flow/inFlow.md", "pages/www-leaferjs-com/ui/en/plugin/in/flow.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
