// aframe example: sound: positional audio, distanceModel, refDistance and rolloffFactor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sound: positional audio, distanceModel, refDistance and rolloffFactor",
  summary: "A looping sound source orbits the listener (the camera) and drifts in and out of range, panning between the ears and getting quieter with distance. Selects and sliders change distanceModel, refDistance, rolloffFactor and maxDistance, and a toggle turns positional off so it stops panning.",
  section: 'Components',
  tags: ["sound", "positional", "distanceModel", "refDistance", "rolloffFactor", "maxDistance", "volume", "autoplay"],
  docs: ["repo/docs/components/sound.md"],
  provenance: 'pure',
  audio: true,
  added: '2026-11-15',
});
