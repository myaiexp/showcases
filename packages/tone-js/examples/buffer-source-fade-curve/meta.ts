// Tone.js example: Bell one-shots with fade curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bell one-shots with fade curves',
  summary:
    "Tone.ToneBufferSource is the play-once building block under Player: every strike is a new source with its own fadeIn, fadeOut and curve. Cut to 0.7 seconds, the gong either clicks off or fades smoothly; tap the pads to strike it yourself.",
  section: 'Sources',
  tags: ['ToneBufferSource', 'fadeIn', 'fadeOut', 'curve', 'playbackRate'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/ToneBufferSource.ts', 'repo/Tone/source/OneShotSource.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
