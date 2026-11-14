// Tone.js example: Notes that fire by chance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Notes that fire by chance',
  summary:
    'Every Tone event has a probability from 0 to 1, the chance it fires each time it comes due. Grey dots are the slots on the grid, pink dots are the pings that actually fired: at 1 every slot fires, lower values leave random gaps, which is handy for generative patterns.',
  section: 'Events',
  tags: ['Loop', 'probability', 'NoiseSynth'],
  docs: [
    'repo/Events.md',
    'repo/Tone/event/Loop.ts',
    'repo/Tone/event/ToneEvent.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
