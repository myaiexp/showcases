// @raw(...) keeps text as written for @content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Raw: HTML inside @content",
  summary: "@raw passes its text through without treating it as CSS, so the heading, the paragraph and the style element inside it become real HTML in the cell. Commas stay in the text.",
  section: "Values",
  tags: ["@raw","@content"],
  docs: ["pages/css-doodle-com/reference/function-raw.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
