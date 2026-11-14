// vchart example: Sequence analysis: step mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence analysis: step mode',
  summary:
    'The sequenceAnalysis chart puts each user\'s events on a row and aligns them by step; patternData draws the links, coloured by pattern_type, and stepMediumMap labels the top of each step. isExtend on a pattern link stretches its source or target end towards the outside of its step band, and a select flips it.',
  section: 'Extensions',
  tags: ['sequenceAnalysis', 'registerSequenceAnalysis', 'mode', 'patternData', 'isExtend', 'stepMediumMap', 'userImageMap', 'customTransformSpec'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/sequence_analysis.md',
    'repo/docs/assets/option/en/chart/sequence-analysis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
