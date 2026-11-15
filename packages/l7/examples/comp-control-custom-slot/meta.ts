// l7 example: Control position as a DOM element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Control position as a DOM element",
  summary:
    "position may be an Element instead of a slot name: the control renders inside the node you pass, here a panel in the middle of the map.",
  section: "Component",
  tags: ["position","Element","Zoom","Scale"],
  docs: ["repo/site/docs/api/component/control.en.md","repo/site/docs/api/common/control/api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
