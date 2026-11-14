// playcanvas example: Compute shader with a storage texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compute shader writing a storage texture (WebGPU)',
  summary:
    'A compute shader writes an animated 100 x 75 image into a storage: true texture with textureStore, dispatched through setupDispatchThreads and the dispatchThreadsCS include so the threads past the image edge skip their texels. A standard material shows the texture on a plane. Without WebGPU the example says so and paints the same pattern on the CPU.',
  section: 'Graphics: Shaders',
  tags: ['Compute', 'storage texture', 'storage: true', 'setupDispatchThreads', 'dispatchThreadsCS', 'texture_storage_2d', 'textureStore'],
  docs: [
    'repo/docs/user-manual/graphics/shaders/compute-shaders.md',
    'repo/docs/user-manual/graphics/shaders/wgsl-reflection.md',
    'repo/docs/user-manual/graphics/shaders/preprocessor.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
