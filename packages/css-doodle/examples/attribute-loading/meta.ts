// css-doodle example: The loading attribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The loading attribute",
  summary:
    "loading=\"lazy\" delays the first draw until a doodle is near the viewport. In a scrolling list the doodles below stay blank until they scroll in; the label under each says whether it has drawn.",
  section: "Attributes",
  tags: ['loading', 'update()'],
  docs: [
    'pages/css-doodle-com/reference/attribute-loading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
