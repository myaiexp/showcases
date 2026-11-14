// Tone.js example: Arpeggio that hops, shuffles or wanders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arpeggio that hops, shuffles or wanders',
  summary:
    'More Tone.Pattern orders: alternateUp and alternateDown climb two steps and fall back one, randomOnce plays every note once in shuffled order before reshuffling, and randomWalk steps up or down one place at a time. The numbers trace the path.',
  section: 'Events',
  tags: ['Pattern', 'alternateUp', 'alternateDown', 'random', 'randomOnce', 'randomWalk'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Pattern.ts',
    'repo/Tone/event/PatternGenerator.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
