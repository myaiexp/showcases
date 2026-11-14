// Pizzicato.js example: Distortion's gain turning a clean tone into fuzz
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fuzz pedal',
  summary:
    'A clean guitar-like riff through Distortion: the more gain, the more the smooth wave is squashed flat on top and bottom, which is what you hear as fuzz. Watch the scope go from curvy to square.',
  section: 'Effects',
  tags: ['Distortion', 'gain'],
  docs: ['repo/README.md', 'repo/src/Effects/Distortion.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
