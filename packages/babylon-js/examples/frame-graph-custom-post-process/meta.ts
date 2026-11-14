// babylon-js example: Frame graph custom post-process task
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frame graph custom post-process task',
  summary:
    'An edge-detection fragment shader turned into a frame graph task with FrameGraphCustomPostProcessTask: the shader code is passed inline with useShaderStore false, and its escale and threshold uniforms are set in onApplyObservable. The task sits between the object renderer and the copy to the canvas, and can be disabled.',
  section: 'Frame Graph',
  tags: ['FrameGraphCustomPostProcessTask', 'onApplyObservable', 'useShaderStore', 'FrameGraph'],
  docs: [
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphExamples/frameGraphExampleCustomPostProcess.md',
    'repo/content/features/featuresDeepDive/frameGraph/frameGraphBasicConcepts/frameGraphReplaceRenderLoop.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
