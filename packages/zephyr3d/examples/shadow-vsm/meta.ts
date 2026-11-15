// zephyr3d example: VSM variance shadows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'VSM variance shadows',
  summary:
    'Variance Shadow Mapping stores the mean and mean-square depth and blurs the map, giving smooth, noise-free edges that can light-bleed. vsmBlurKernelSize, vsmBlurRadius and vsmDarkness (darker, less bleeding) are live.',
  section: 'Shadows',
  tags: ['shadow.mode', 'vsm', 'vsmBlurKernelSize', 'vsmBlurRadius', 'vsmDarkness'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
