// postprocessing example: TiltShiftEffect blur quality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tilt shift kernel and resolution',
  summary:
    'The blur behind a TiltShiftEffect is a Kawase blur: kernelSize sets how far it reaches and resolutionScale how big a buffer it runs in. Change them and compare the smoothness of the blurred bands.',
  section: 'Blur',
  tags: ['TiltShiftEffect', 'KernelSize', 'kernelSize', 'resolutionScale', 'resolution'],
  docs: ['repo/README.md', 'repo/src/effects/TiltShiftEffect.js', 'repo/src/enums/KernelSize.js', 'repo/src/passes/TiltShiftBlurPass.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
