// zephyr3d example: ESM exponential shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ESM exponential shadows',
  summary:
    'Exponential Shadow Mapping gives very soft, stable, cheap edges but needs tuning per scene. esmDepthScale sets the falloff, and esmBlur, esmLogSpace, esmBlurKernelSize and esmBlurRadius control the optional blur.',
  section: 'Shadows',
  tags: ['shadow.mode', 'esm', 'esmDepthScale', 'esmBlur', 'esmLogSpace', 'esmBlurKernelSize', 'esmBlurRadius'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
