// zephyr3d example: A custom render module on a camera's own pipeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom render module on a camera's own pipeline",
  summary:
    "A RenderModule that reads SceneColor and LinearDepth, draws depth outlines into a separate texture and publishes it back, inserted after LightPass in a pipeline from createForwardPlusPipeline(). Assigning camera.renderPipeline = null returns to the shared default.",
  section: "Advanced Topics",
  tags: ['RenderModule', 'RenderPipeline', 'createForwardPlusPipeline', 'ForwardPlusModules', 'FrameResources', 'blackboard', 'insertAfter', 'renderPipeline'],
  docs: ['repo/apps/doc/web/en/rendergraph.md', 'repo/apps/doc/src/tut-70/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
