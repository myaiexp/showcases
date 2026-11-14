// css-doodle example: :doodle(:hover): cells read the host state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: ":doodle(:hover): cells read the host state",
  summary:
    "Cells cannot see the hover state of the host, but they can read custom properties set on it. Hover the doodle and the cells drop with --s; cards play the hover on their own by setting --s from a timer.",
  section: "Selectors",
  tags: [':doodle', ':hover', 'custom properties', '@pn'],
  docs: [
    'pages/css-doodle-com/reference/selector-doodle.md',
    'repo/docs/grammar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
