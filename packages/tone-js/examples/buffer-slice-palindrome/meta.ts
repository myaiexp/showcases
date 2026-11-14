// Tone.js example: Cut a buffer and play it back and forth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Cut a buffer and play it back and forth',
  summary:
    "ToneAudioBuffer.slice cuts a piece out of a recording without touching the original, and reverse flips a copy. Played forward, back, forward, back, the phrase becomes a palindrome. The shaded part of the strip is the piece being cut.",
  section: 'Sources',
  tags: ['ToneAudioBuffer', 'slice', 'reverse', 'Player'],
  docs: ['repo/Sources.md', 'repo/Tone/core/context/ToneAudioBuffer.ts', 'repo/Tone/source/buffer/Player.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
