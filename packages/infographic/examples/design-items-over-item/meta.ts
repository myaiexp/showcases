// AntV Infographic example: Design: items wins when item is also set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Design: items wins when item is also set',
  summary:
    'The design page notes that when item and items both exist, items has priority. The first step sets only item plain-text, so every level uses it; the second adds an items list and the levels take circle-node and pill-badge instead.',
  section: 'Design',
  tags: ['design', 'item', 'items', 'plain-text', 'circle-node', 'pill-badge'],
  docs: [
    'repo/site/src/content/learn/design.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
