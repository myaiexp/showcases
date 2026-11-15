// l7 example: Popup stopPropagation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Popup stopPropagation",
  summary:
    "By default pointer events on the bubble stop there; set stopPropagation false and a click on it also counts as a map click.",
  section: "Component",
  tags: ["Popup","stopPropagation","click"],
  docs: ["repo/site/docs/api/component/popup.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
