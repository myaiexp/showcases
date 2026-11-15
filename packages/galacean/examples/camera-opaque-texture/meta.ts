// galacean example: Opaque texture: a glass pane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opaque texture: a glass pane",
  summary:
    "With opaqueTextureEnabled the camera keeps a copy of the opaque pass. A transparent glass pane samples it as camera_OpaqueTexture with a wobbling offset to bend what is behind it; opaqueTextureDownsampling trades sharpness for cost.",
  section: "Camera",
  tags: ['Camera', 'opaqueTextureEnabled', 'opaqueTextureDownsampling', 'Downsampling', 'camera_OpaqueTexture'],
  docs: [
    'repo/docs/en/graphics/camera/texture.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
