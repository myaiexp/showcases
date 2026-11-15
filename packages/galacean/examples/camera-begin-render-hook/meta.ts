// galacean example: onBeginRender per camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "onBeginRender per camera",
  summary:
    "Two cameras draw the same cube side by side; a Script on each camera entity uses onBeginRender to tint the shared material, so each half shows a different colour from one material.",
  section: "Camera",
  tags: ['Camera', 'onBeginRender', 'onEndRender', 'Script', 'viewport'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
