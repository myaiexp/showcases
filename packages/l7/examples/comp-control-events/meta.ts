// l7 example: Control events add, remove, show, hide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Control events add, remove, show, hide",
  summary:
    "Every control emits add and remove when it joins or leaves the scene and show and hide when toggled; each chip lights as its event fires.",
  section: "Component",
  tags: ["add","remove","show","hide","addControl","removeControl","Zoom"],
  docs: ["repo/site/docs/api/component/control.en.md","repo/site/docs/api/common/control/event.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
