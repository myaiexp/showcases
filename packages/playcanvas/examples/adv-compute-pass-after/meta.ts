// playcanvas example: Compute pass after the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compute pass after the camera',
  summary:
    'A ComputePass in camera.afterPasses dispatches a WGSL compute shader that reads the colour map the camera rendered in the same frame (requestSceneColorMap, setSceneColorMap) and writes a Sobel edge image into a storage texture, sized in onBefore with setupDispatchThreads. WebGPU only: WebGL 2 gets a notice and the plain scene.',
  section: 'Graphics: Advanced Rendering',
  tags: ['ComputePass', 'Compute', 'afterPasses', 'requestSceneColorMap', 'setSceneColorMap', 'sceneColorMapHandle', 'setupDispatchThreads', 'onBefore', 'supportsCompute'],
  docs: [
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/compute-pass.md',
    'repo/docs/user-manual/graphics/advanced-rendering/frame-graph/camera-passes.md',
    'repo/docs/user-manual/graphics/shaders/compute-shaders.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
