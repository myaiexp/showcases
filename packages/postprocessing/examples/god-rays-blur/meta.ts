// postprocessing example: God rays: blur and kernel size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: blur and kernel size',
  summary:
    "Before the radial blur, GodRaysEffect blurs the masked light with a KawaseBlurPass to hide aliasing. The blur option or blurPass.enabled switches it off, and the kernel size decides how soft the light mask, and so each beam's edge, becomes.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'blurPass', 'blur', 'kernelSize', 'KernelSize'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag', 'repo/src/passes/KawaseBlurPass.js', 'repo/src/materials/KawaseBlurMaterial.js', 'repo/src/enums/KernelSize.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
