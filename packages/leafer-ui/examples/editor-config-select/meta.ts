// leafer-ui example: Editor config: select decides press or tap selects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: select decides press or tap selects",
  summary: "With select 'press' (the default) a pointer press selects at once, so one drag both selects and moves an element; with 'tap' selection waits for the click, so the first drag on an unselected rect only box-selects.",
  section: 'Graphic editor',
  tags: ["Editor", "select", "press", "tap"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/select.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
