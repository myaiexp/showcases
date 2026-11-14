// deck-gl example: Deck metrics readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Deck metrics readout',
  summary:
    "Deck's experimental _onMetrics callback reports once a second: fps, layer counts, attribute update time, picking counts and GPU memory. Add layers, change data or pick to watch the numbers move.",
  section: 'Data and performance',
  tags: ['_onMetrics', 'metrics', 'fps', 'debugging', 'gpuMemory'],
  docs: [
    'repo/docs/developer-guide/debugging.md',
    'repo/docs/api-reference/core/deck.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
