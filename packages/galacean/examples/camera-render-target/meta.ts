// galacean example: Camera renderTarget as a TV screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera renderTarget as a TV screen",
  summary:
    "A second Camera with a RenderTarget draws a spinning shape into a texture each frame, and that texture is the baseTexture of a screen the main camera looks at.",
  section: "Camera",
  tags: ['Camera', 'renderTarget', 'RenderTarget', 'Texture2D', 'cullingMask', 'baseTexture'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/texture/rtt.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
