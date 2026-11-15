// galacean example: ShaderLab opaque texture lens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab opaque texture lens",
  summary: "camera_OpaqueTexture holds the opaque scene the camera has drawn so far: a transparent lens quad samples it with a rippling offset, so the pattern behind it wobbles like heat haze.",
  section: "ShaderLab",
  tags: ['camera_OpaqueTexture','Camera.opaqueTextureEnabled'],
  docs: [
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/examples/shaderlab-05-advance.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
