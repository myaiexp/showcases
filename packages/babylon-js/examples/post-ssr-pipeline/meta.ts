// babylon-js example: Screen space reflections pipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Screen space reflections pipeline',
  summary:
    'An SSRRenderingPipeline traces reflections in screen space: the glossy floor, reflective through its StandardMaterial specularColor, mirrors the floating shapes, which have black specular and are skipped. isEnabled, debug colours, blur dispersion, strength, thickness, step and roughnessFactor are live.',
  section: 'Post Processes',
  tags: ['SSRRenderingPipeline', 'thickness', 'blurDispersionStrength', 'roughnessFactor', 'debug'],
  docs: ['repo/content/features/featuresDeepDive/postProcesses/ssrRenderingPipeline.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
