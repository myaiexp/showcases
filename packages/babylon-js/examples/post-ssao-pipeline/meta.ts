// babylon-js example: SSAO rendering pipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO rendering pipeline',
  summary:
    'SSAORenderingPipeline computes ambient occlusion from the depth buffer and blends it over the scene, darkening where shapes meet the ground. It is created with separate SSAO and combine ratios and attached to the camera; disabling its SSAOCombineRenderEffect through the pipeline manager shows the occlusion term alone.',
  section: 'Post Processes',
  tags: ['SSAORenderingPipeline', 'postProcessRenderPipelineManager', 'SSAOCombineRenderEffect', 'totalStrength'],
  docs: [
    'repo/content/features/featuresDeepDive/postProcesses/SSAORenderPipeline.md',
    'repo/content/features/featuresDeepDive/postProcesses/postProcessRenderPipeline.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
