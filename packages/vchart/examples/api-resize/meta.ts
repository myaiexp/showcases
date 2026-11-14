// vchart example: API: resize with autoFit off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: resize with autoFit off',
  summary:
    'With autoFit false the chart no longer follows its container, so resize(width, height) is the only way to change its size. Sliders call resize in pixels and a readout reports the size the canvas ends up with; the card cycles three sizes.',
  section: 'API',
  tags: ['resize', 'autoFit', 'getCanvas'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
