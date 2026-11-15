// zephyr3d example: Gerstner waves: direction, amplitude, length, steepness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gerstner waves: direction, amplitude, length, steepness",
  summary:
    "GerstnerWaveGenerator layers directional waves, each set by hand with setWaveDirection, setWaveAmplitude, setWaveLength and setWaveSteepness. Pick a wave and tune it.",
  section: "Environment",
  tags: ['GerstnerWaveGenerator', 'numWaves', 'setWaveDirection', 'setWaveAmplitude', 'setWaveLength', 'setWaveSteepness'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
