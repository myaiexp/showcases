// tone-js example: Transpose a melody without changing its speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transpose a melody without changing its speed",
  summary:
    "Tone.PitchShift moves everything up or down by a number of semitones while the melody keeps its tempo. Seven semitones is a fifth, twelve is an octave.",
  section: 'Effects',
  tags: ['PitchShift', 'pitch', 'windowSize'],
  docs: ['repo/Tone/effect/PitchShift.ts', 'repo/Tone/effect/FeedbackEffect.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
