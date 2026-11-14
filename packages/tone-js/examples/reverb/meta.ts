// tone-js example: Voice in a closet and in a cathedral
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Voice in a closet and in a cathedral',
  summary:
    'Tone.Reverb builds a room out of decaying noise: a 0.4 second decay is a closet, 5 seconds is a cathedral. The reverb generates its room asynchronously, so wait for its ready promise before playing.',
  section: 'Effects',
  tags: ['Reverb', 'ready', 'decay', 'preDelay', 'wet'],
  docs: ['repo/Effects.md', 'repo/Tone/effect/Reverb.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
