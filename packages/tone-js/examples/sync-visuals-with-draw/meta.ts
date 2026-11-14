// Tone.js example: Tone.Draw lines up visuals with the moment each note is heard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keep visuals in time with the music',
  summary:
    'Transport callbacks run a little before their notes are heard, so drawing inside them looks early. Tone.Draw holds a drawing until the animation frame nearest the sound, so each light lands on its note.',
  section: 'Context',
  tags: ['Draw', 'getDraw', 'schedule', 'Loop', 'Transport'],
  docs: ['repo/Tone/core/util/Draw.ts', 'repo/Performance.md', 'repo/Tone/event/Sequence.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
