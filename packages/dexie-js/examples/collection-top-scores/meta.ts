// dexie-js example: Top 5 scores: orderBy + reverse + limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Top 5 scores: orderBy + reverse + limit",
  summary:
    "A leaderboard in three calls: order the scores, turn the order around so the biggest is first, and keep five. The five winners light up in the grid and appear in rank order on the right. Change how many to keep in the full view.",
  section: 'Collection',
  tags: ['orderBy', 'reverse', 'limit', 'toArray'],
  docs: ['repo/docs/Collection/Collection.limit().md', 'repo/docs/Collection/Collection.reverse().md', 'repo/docs/Collection/Collection.desc().md'],
  provenance: 'pure',
  added: '2026-11-14',
});
