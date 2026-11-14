// Tone.js example: Presses that wait for the next beat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Presses that wait for the next beat',
  summary:
    'A time written "@4n" means the next quarter-note line of the running Transport, so a press that lands between beats is held and sounds exactly on the grid. The full view has pads to try it; the card replays four presses.',
  section: 'Time',
  tags: ['Time', '@', 'quantize', 'Transport', 'Loop'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts', 'repo/Transport.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
