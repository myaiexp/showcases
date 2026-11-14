// Tone.js example: Loosen a rigid machine beat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loosen a rigid machine beat',
  summary:
    'Set humanize on an event and the time it passes to its callback wanders by up to that amount, so the notes stop sounding like a metronome. Grey dots are the perfect grid; pink dots show where each note landed. Try true, a 32nd or a 16th.',
  section: 'Events',
  tags: ['Loop', 'humanize', 'time'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Loop.ts',
    'repo/Tone/event/ToneEvent.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
