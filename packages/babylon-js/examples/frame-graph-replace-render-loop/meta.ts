// babylon-js example: Frame graph in place of the render loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frame graph in place of the render loop',
  summary:
    'A FrameGraph assigned to scene.frameGraph, so it replaces the usual rendering. Colour and depth textures come from the texture manager as handles; a ClearTexture task, an ObjectRenderer task, ChromaticAberration and BlackAndWhite post-process tasks and a CopyToBackbuffer task are chained through their output handles, then built with buildAsync.',
  section: 'Frame Graph',
  tags: ['FrameGraph', 'FrameGraphObjectRendererTask', 'textureManager', 'FrameGraphCopyToBackbufferColorTask', 'buildAsync'],
  docs: [
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphBasicConcepts.md',
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphBasicConcepts/frameGraphReplaceRenderLoop.md',
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphClassFramework/frameGraphTaskList.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
