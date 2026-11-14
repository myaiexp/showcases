// tone-js example: Thicken a riff with extra harmonics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Thicken a riff with extra harmonics",
  summary:
    "Tone.Chebyshev bends the waveform with a polynomial, adding overtones. Odd and even orders sound very different, and order 1 changes nothing.",
  section: 'Effects',
  tags: ['Chebyshev', 'order', 'oversample'],
  docs: ['repo/Tone/effect/Chebyshev.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
