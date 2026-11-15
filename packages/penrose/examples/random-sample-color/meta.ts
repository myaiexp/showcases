// penrose example: sampleColor(alpha, colorType)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sampleColor(alpha, colorType)',
  summary:
    '`sampleColor(0.9, "rgb")` picks three independent channels; `sampleColor(0.9, "hsv")` picks a random hue at a fixed, pleasant saturation and value. The two tabs fill the same six discs with each model, so the second reads as a bright palette.',
  section: 'Random Sampling',
  tags: ['sampleColor', 'fillColor', 'rgb', 'hsv'],
  docs: ['repo/packages/docs-site/docs/ref/style/random-sampling.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
