// zephyr3d example: FFT ocean: wind, cascades and foam
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FFT ocean: wind, cascades and foam",
  summary:
    "FFTWaveGenerator simulates an ocean spectrum in three cascades whose sizes follow the wind speed. Per-cascade setWaveStrength and setWaveCroppiness, plus foamWidth and foamContrast. isOk() tells whether the device supports it.",
  section: "Environment",
  tags: ['FFTWaveGenerator', 'wind', 'foamWidth', 'foamContrast', 'setWaveStrength', 'setWaveCroppiness', 'getWaveLength', 'isOk'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
