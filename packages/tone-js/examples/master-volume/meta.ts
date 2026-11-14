// Tone.js example: the Destination's volume and mute control everything at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One volume knob for everything',
  summary:
    'Every sound ends at the Destination, the speakers. Its volume and mute act on the whole app at once: turn it down in decibels, mute it, or fade everything to silence with a ramp.',
  section: 'Context',
  tags: ['Destination', 'getDestination', 'volume', 'mute', 'rampTo'],
  docs: ['repo/Tone/core/context/Destination.ts', 'repo/Connections.md', 'repo/Signals.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
