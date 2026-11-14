// PlayCanvas: Scroll view with a layout list
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scroll view with a layout list",
  summary:
    "A scroll view is a masked viewport over larger content with a scrollbar beside it. The content is a layout group of rows, sized from its reflow event; the card scrolls by setting the scroll value, the full view drags, uses the wheel, switches Clamp, Bounce and Infinite and adds rows.",
  section: "User Interface",
  tags: ["ScrollViewComponent","ScrollbarComponent","scroll","scrollMode","bounceAmount","friction","reflow","mask"],
  docs: ["repo/docs/user-manual/user-interface/scroll-views.md","repo/docs/user-manual/user-interface/layout-groups.md","repo/docs/user-manual/user-interface/masks.md","repo/docs/user-manual/editor/scenes/components/scrollview.md","repo/docs/user-manual/editor/scenes/components/scrollbar.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
