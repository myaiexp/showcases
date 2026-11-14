// Tone.js example: Drop a sound at a bar and beat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drop a sound at a bar and beat',
  summary:
    'Five sounds are pinned to positions like 1:1:2 (bar, beat, sixteenth) with Transport.schedule. They land in the same musical spots at any tempo and repeat on every loop. Drag the tempo to see the positions stay put.',
  section: 'Transport',
  tags: ['schedule', 'loop', 'setLoopPoints', 'bpm', 'MembraneSynth', 'NoiseSynth'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
    'repo/TransportTime.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
