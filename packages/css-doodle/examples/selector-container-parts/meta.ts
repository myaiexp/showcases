// css-doodle example: :doodle and :container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ":doodle and :container",
  summary:
    "The layout is :doodle, then :container, then the cells. Three cells here each carry a smaller doodle: the first two are labelled with the part they stand for, the third holds a nested @doodle.",
  section: "Selectors",
  tags: [':container', ':doodle', '@cell', '@doodle', '@pn'],
  docs: [
    'pages/css-doodle-com/reference/selector-container.md',
    'pages/css-doodle-com/reference/function-doodle.md',
    'pages/css-doodle-com/reference/function-pn.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
