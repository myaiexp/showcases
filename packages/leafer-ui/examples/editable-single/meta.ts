// leafer-ui example: Editable: "single" keeps one element selected alone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editable: \"single\" keeps one element selected alone",
  summary: "editable: \"single\" lets an element be selected only by itself. Shift-clicking the others adds them to a normal selection, but never to the single one. The readout lists the selection.",
  section: "Interaction",
  tags: ["editable","single","editor","App","select"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/editable.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
