// Tone.js example: Jump to any bar mid-song
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Jump to any bar mid-song',
  summary:
    'A Transport can start from anywhere: start(time, offset) in code, or assign Transport.position (or seconds) while it plays. The card jumps around a four-bar phrase; in the full view buttons jump to each bar and the part plays whatever is there.',
  section: 'Transport',
  tags: ['position', 'seconds', 'start', 'stop', 'offset', 'Part'],
  docs: [
    'repo/Transport.md',
    'repo/Tone/core/clock/Transport.ts',
    'repo/TransportTime.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
