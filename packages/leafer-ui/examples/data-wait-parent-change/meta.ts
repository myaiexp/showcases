// leafer-ui example: Data: waitParentChange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Data: waitParentChange",
  summary:
    "waitParentChange(fn) stays in the element's listener queue, so fn runs every time the parent changes. The rect hops between two groups and changes colour each time.",
  section: "Data",
  tags: ["waitParentChange","parent"],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/UI/parent.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
