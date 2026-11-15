// galacean example: Depth texture: soft water edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Depth texture: soft water edges",
  summary:
    "depthTextureMode = PrePass makes the opaque depth available to shaders as camera_DepthTexture. A transparent water plane reads it to fade and foam where it meets the shapes poking through it.",
  section: "Camera",
  tags: ['Camera', 'depthTextureMode', 'DepthTextureMode', 'camera_DepthTexture', 'Shader'],
  docs: [
    'repo/docs/en/graphics/camera/texture.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/material/variables.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
