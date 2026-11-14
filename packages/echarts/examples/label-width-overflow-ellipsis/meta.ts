// echarts example: Label width, overflow and ellipsis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label width, overflow and ellipsis',
  summary:
    'Long scatter labels in a fixed-width text block. Choose truncate, break or breakAll for overflow, set the ellipsis text, resize the block with a slider and tune lineHeight and the label background.',
  section: 'Label',
  tags: ['label.width', 'label.overflow', 'label.ellipsis', 'label.lineHeight', 'label.backgroundColor', 'label.padding', 'label.borderRadius'],
  docs: ['repo/contents/en/how-to/label/rich-text.md', 'repo/en/option/partial/text-style.md', 'repo/en/option/partial/label.md', 'repo/en/option/series/scatter.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
