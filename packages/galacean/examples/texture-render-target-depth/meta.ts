// galacean example: RenderTarget with a depth texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "RenderTarget with a depth texture",
  summary:
    "A RenderTarget built from a colour texture and a depth texture: an offscreen camera fills both, and the depth texture is shown on a second screen next to the colour result.",
  section: "Texture",
  tags: ['RenderTarget', 'Texture2D', 'TextureFormat.Depth', 'Camera.renderTarget'],
  docs: [
    'repo/docs/en/graphics/texture/rtt.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
