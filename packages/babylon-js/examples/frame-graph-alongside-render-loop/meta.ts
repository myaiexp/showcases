// babylon-js example: Frame graph after the scene render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frame graph after the scene render',
  summary:
    'The scene keeps its normal render loop and renders into a PassPostProcess. A FrameGraph imports that texture with importTexture, runs Bloom and BlackAndWhite tasks over it and copies the result to the canvas, executed by hand in onAfterRenderObservable. The import is refreshed under the same handle when the texture is resized.',
  section: 'Frame Graph',
  tags: ['FrameGraph', 'importTexture', 'FrameGraphBloomTask', 'PassPostProcess', 'execute'],
  docs: [
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphBasicConcepts.md',
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphBasicConcepts/frameGraphInAdditionToRenderLoop.md',
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphClassFramework/frameGraphTaskList.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
