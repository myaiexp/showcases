// babylon-js example: Default rendering pipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Default rendering pipeline",
  summary:
    "DefaultRenderingPipeline over glowing spheres: toggle bloom, FXAA, chromatic aberration, grain and sharpen.",
  section: 'Post Processes',
  tags: ['DefaultRenderingPipeline', 'bloomEnabled', 'fxaaEnabled', 'chromaticAberration', 'grain'],
  docs: [
    'repo/content/features/featuresDeepDive/postProcesses/defaultRenderingPipeline.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
