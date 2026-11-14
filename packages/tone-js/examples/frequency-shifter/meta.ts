// tone-js example: Robot voice from a frequency shift
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Robot voice from a frequency shift",
  summary:
    "Tone.FrequencyShifter adds the same number of hertz to every frequency, which breaks the harmonic pattern and makes a voice sound metallic and alien. It is not a pitch shift.",
  section: 'Effects',
  tags: ['FrequencyShifter', 'frequency', 'wet'],
  docs: ['repo/Tone/effect/FrequencyShifter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
