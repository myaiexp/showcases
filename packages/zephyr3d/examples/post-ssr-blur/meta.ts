// zephyr3d example: SSR blur and denoising
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSR blur and denoising',
  summary:
    'Reflections off a semi-rough floor are noisy until the bilateral blur smooths them: ssrBlurScale, ssrBlurDepthCutoff, ssrBlurKernelSize and ssrBlurStdDev, with the recommended settings from the docs as presets.',
  section: 'Post-processing',
  tags: ['SSR', 'ssrBlurScale', 'ssrBlurDepthCutoff', 'ssrBlurKernelSize', 'ssrBlurStdDev'],
  docs: ['repo/apps/doc/web/en/posteffect-ssr.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
