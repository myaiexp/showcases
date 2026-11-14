// Units carry to the result; a leading operator modifies a cell function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Units and leading-operator modifiers',
  summary:
    'Bars as tall as their column number. A leading operator on a cell function is a modifier and a unit on its argument carries to the result, so @x(*10%) is 10%, 20%, … 100%. @x(-1) counts from 0 instead, and $%(@x * 10) is the same height written as calc with a unit.',
  section: 'Syntax overview',
  tags: ["@x", "modifiers", "units", "$%()"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "pages/css-doodle-com/reference/function-x.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
