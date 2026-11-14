// playcanvas example: Compute shader with a storage buffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compute shader and a storage buffer (WebGPU)',
  summary:
    'A WGSL compute Shader (cshader) fills a StorageBuffer with a travelling wave every frame through Compute.setParameter, setupDispatch and device.computeDispatch, and StorageBuffer.read returns the numbers to size 32 bars. Compute needs WebGPU: on WebGL 2 the example says so and runs the same wave on the CPU.',
  section: 'Graphics: Shaders',
  tags: ['Compute', 'StorageBuffer', 'Shader', 'cshader', 'computeDispatch', 'setupDispatch', 'supportsCompute', 'StorageBuffer.read'],
  docs: ['repo/docs/user-manual/graphics/shaders/compute-shaders.md', 'repo/docs/user-manual/graphics/shaders/wgsl-reflection.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
