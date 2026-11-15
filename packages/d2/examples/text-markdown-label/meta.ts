// d2 example: Markdown label on a shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Markdown label on a shape',
  summary:
    'A Markdown block is a text shape by default and shows no outline. Setting `explanation.shape: rectangle` declares it explicitly, so the box appears around the rendered Markdown.',
  section: 'Text & Code',
  tags: ['markdown', 'shape'],
  docs: ['repo/docs/tour/text.md', 'repo/static/d2/markdown-label.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
