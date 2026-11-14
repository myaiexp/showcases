// echarts example: Merging monthly bars into quarters with itemGroupId
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Merging monthly bars into quarters with itemGroupId',
  summary:
    'The 5.2 data split and merge animation, driven from a dataset: twelve monthly bars carry their quarter as a group id, and four quarterly bars carry their own. Toggle the view and the months merge into quarters or split back, with divideShape split or clone.',
  section: "What's New in 5",
  tags: ['universalTransition', 'divideShape', 'encode.itemGroupId', 'dataset.source', 'groupId'],
  docs: [
    'repo/contents/en/basics/release-note/5-2-0.md',
    'repo/en/option/partial/universal-transition.md',
    'repo/en/option/partial/group-id.md',
    'repo/en/option/partial/encode-dimensions.md',
    'repo/contents/en/concepts/dataset.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
