// babylon-js example: Built-in post processes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in post processes",
  summary:
    "Attach built-in post processes to the camera and swap them: black and white, a two-pass blur, emboss convolution and tonemapping.",
  section: 'Post Processes',
  tags: ['BlackAndWhitePostProcess', 'BlurPostProcess', 'ConvolutionPostProcess', 'TonemapPostProcess'],
  docs: [
    'repo/content/features/featuresDeepDive/postProcesses/usePostProcesses.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
