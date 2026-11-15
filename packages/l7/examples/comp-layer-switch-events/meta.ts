// l7 example: LayerSwitch events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "LayerSwitch events",
  summary:
    "popperShow and popperHide report the list opening and closing; selectChange delivers the new selection.",
  section: "Component",
  tags: ["LayerSwitch","selectChange","popperShow","popperHide"],
  docs: ["repo/site/docs/api/component/layer_switch.en.md","repo/site/docs/api/common/control/popper-event.en.md","repo/site/docs/api/common/control/select-event.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
