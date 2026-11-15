// galacean example: Post-process priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Post-process priority",
  summary: "Two global volumes disagree about the bloom intensity (0.2 against 3): the one with the higher priority is the one that applies. The card swaps their priorities; the full view has a slider.",
  section: "Post Process",
  tags: ['PostProcess.priority','BloomEffect'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
