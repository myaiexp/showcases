// PlayCanvas: Scrollbar as a slider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scrollbar as a slider",
  summary:
    "A scrollbar whose handle is smaller than its track is a slider: value runs from 0 to 1 and set:value fires as the handle moves. A fill bar and a readout follow it; the card sweeps the value, the full view drags the handle and resizes it.",
  section: "User Interface",
  tags: ["ScrollbarComponent","value","handleSize","handleEntity","set:value"],
  docs: ["repo/docs/user-manual/user-interface/common-widgets.md","repo/docs/user-manual/user-interface/scroll-views.md","repo/docs/user-manual/editor/scenes/components/scrollbar.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
