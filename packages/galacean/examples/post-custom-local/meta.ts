// galacean example: Custom effect in a local volume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom effect in a local volume",
  summary: "The custom grayscale effect lives in a local volume: the colour drains from the scene as the camera approaches the box, because the pass reads the blended intensity that getBlendEffect returns for that camera position.",
  section: "Post Process",
  tags: ['PostProcessEffect','PostProcess.isGlobal','blendDistance','getBlendEffect'],
  docs: [
    'repo/docs/en/graphics/postProcess/customPostProcess.mdx',
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
