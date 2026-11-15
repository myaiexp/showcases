// postprocessing example: OutlineEffect blur and kernelSize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: blur and kernel size',
  summary:
    'With blur on, OutlineEffect runs its edge texture through a Kawase blur pass, turning the thin line into a glow. The kernelSize (VERY_SMALL up to HUGE) sets how far the glow spreads; edgeStrength compensates for the blur thinning the edge.',
  section: 'Outline',
  tags: ['OutlineEffect', 'blur', 'blurPass', 'kernelSize', 'KernelSize', 'KawaseBlurPass'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/enums/KernelSize.js', 'repo/src/passes/KawaseBlurPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
