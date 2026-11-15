// galacean example: Custom post-process effect data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom post-process effect data",
  summary: "A CustomEffect holds a float intensity parameter and a custom pass reads its blended value in onRender, mixing the image toward grayscale by that amount; isValid skips the pass entirely at zero. A slider drives the effect in the full view.",
  section: "Post Process",
  tags: ['PostProcessEffect','PostProcessEffectFloatParameter','getBlendEffect','PostProcessPass.isValid'],
  docs: [
    'repo/docs/en/graphics/postProcess/customPostProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
