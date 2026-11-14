// motion example: Reusable intro nested in a page sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reusable intro nested in a page sequence",
  summary: "A logo-and-tagline intro is written once as its own array and dropped into a page sequence as one block. Choose where the block starts and the whole intro moves together.",
  section: 'Timeline sequences',
  tags: ['sequence', 'nested sequence', 'at'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
