// galacean example: Offscreen render with onBeginRender
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Offscreen render with onBeginRender",
  summary:
    "The docs' recipe with a single camera: in onBeginRender object A (Layer0) is rendered into a RenderTarget, then the camera is pointed back at the screen to draw object B (Layer1), whose baseTexture is the offscreen result.",
  section: "Texture",
  tags: ['RenderTarget', 'Texture2D', 'Script.onBeginRender', 'Camera.render', 'Camera.cullingMask', 'Layer'],
  docs: [
    'repo/docs/en/graphics/texture/rtt.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
