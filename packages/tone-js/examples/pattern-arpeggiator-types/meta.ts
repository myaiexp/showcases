// Tone.js example: Arpeggio up, down, up-and-down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arpeggio up, down, up-and-down',
  summary:
    'A Tone.Pattern walks an array of notes in a classic arpeggiator order. The numbers trace which note of the list sounds each step: up and down are straight runs, upDown and downUp turn around at the ends. The full view lists every pattern name.',
  section: 'Events',
  tags: ['Pattern', 'pattern', 'up', 'down', 'upDown', 'downUp', 'interval'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Pattern.ts',
    'repo/Tone/event/PatternGenerator.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
