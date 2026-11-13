// babylon-js example: Glow layer on emissive meshes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glow layer on emissive meshes',
  summary:
    'One GlowLayer makes every emissive surface glow: neon rings tumbling around a rod. mainTextureFixedSize, blurKernelSize and mainTextureSamples are creation options, intensity and the kernel change live, customEmissiveColorSelector makes the white rod glow magenta, and addExcludedMesh drops a ring from the glow.',
  section: 'Mesh',
  tags: ['GlowLayer', 'intensity', 'blurKernelSize', 'customEmissiveColorSelector', 'addExcludedMesh'],
  docs: ['repo/content/features/featuresDeepDive/mesh/glowLayer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
