// gradient-2d: in <space> picks oklab (default), srgb or srgb-linear
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient colour spaces',
  summary:
    'An optional first argument, in <space>, sets where the colours mix: oklab by default, or srgb and srgb-linear. The same four saturated corners give a different middle in each.',
  section: 'Addons',
  tags: ["gradient-2d", "@mesh-gradient", "oklab", "srgb"],
  docs: ["repo/src/gradient-2d/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
