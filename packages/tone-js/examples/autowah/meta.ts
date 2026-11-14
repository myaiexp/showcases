// tone-js example: Wah pedal that follows how hard you play
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Wah pedal that follows how hard you play",
  summary:
    "Tone.AutoWah opens a filter when the input gets louder and closes it as the note fades, like a wah pedal that listens. A higher Q makes the vowel sound sharper.",
  section: 'Effects',
  tags: ['AutoWah', 'Q', 'sensitivity', 'octaves', 'baseFrequency'],
  docs: ['repo/Tone/effect/AutoWah.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
