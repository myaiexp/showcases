// zephyr3d example: FBM waves: amplitude, frequency, octaves, wind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FBM waves: amplitude, frequency, octaves, wind",
  summary:
    "FBMWaveGenerator is the fast procedural wave source: amplitude, frequency, numOctaves and a wind vector set the sea state, assigned to water.waveGenerator.",
  section: "Environment",
  tags: ['FBMWaveGenerator', 'amplitude', 'frequency', 'numOctaves', 'wind', 'waveGenerator'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
