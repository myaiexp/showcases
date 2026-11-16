// leafer-ui example: Config wheel: posDeltaSpeed and negDeltaSpeed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config wheel: posDeltaSpeed and negDeltaSpeed",
  summary:
    "wheel.posDeltaSpeed scales positive wheel deltas and negDeltaSpeed the negative ones; a negative value reverses that direction, a handy \"natural scrolling\" switch. The card cycles normal and reversed.",
  section: "App & engine config",
  tags: ['Leafer', 'wheel', 'posDeltaSpeed', 'negDeltaSpeed', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/wheel.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
