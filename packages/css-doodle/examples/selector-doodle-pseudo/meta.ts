// css-doodle example: :doodle::before and ::after
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ":doodle::before and ::after",
  summary:
    "The host element has pseudo-elements too: one written nested with & inside :doodle, the other as :doodle::after. They sit over the cells and fade in turn.",
  section: "Selectors",
  tags: [':doodle', '::before', '::after', '&'],
  docs: [
    'pages/css-doodle-com/reference/selector-doodle.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
