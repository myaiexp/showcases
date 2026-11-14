// PlayCanvas: Drag and drop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Drag and drop",
  summary:
    "ElementDragHelper makes an input-enabled element follow the pointer. A card is dragged over a slot; on drag:end its canvasCorners are compared with the slot's and it snaps into the slot or back home. A card shows the same move as a timed slide.",
  section: "User Interface",
  tags: ["ElementDragHelper","drag:end","canvasCorners","useInput"],
  docs: ["repo/docs/user-manual/user-interface/common-widgets.md","repo/docs/user-manual/user-interface/elements.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
