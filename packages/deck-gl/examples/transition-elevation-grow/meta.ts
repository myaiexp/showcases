// deck-gl example: Columns grow from the ground with a uniform transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Columns grow from the ground with a uniform transition',
  summary:
    'A HexagonLayer whose elevationScale is 0 until data arrives and has a 3000 ms transition on that prop: the uniform transition runs on the CPU and the columns rise when the data is set.',
  section: 'Animations and transitions',
  tags: ['transitions', 'elevationScale', 'HexagonLayer', 'uniform prop transition'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
