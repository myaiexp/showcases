// AntV Infographic example: ZoomWheel options: minViewBoxSize and maxViewBoxSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ZoomWheel options: minViewBoxSize and maxViewBoxSize",
  summary:
    "ZoomWheel takes minViewBoxSize and maxViewBoxSize, the smallest and largest viewBox it will zoom to. The full view lets you pick a tight or loose range, zoom with Ctrl+wheel and watch the readout stop at the limit. The card steps the viewBox width the same way and stops at the limits.",
  section: "Editor",
  tags: ["ZoomWheel", "ZoomWheelOptions", "minViewBoxSize", "maxViewBoxSize"],
  docs: ["repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
