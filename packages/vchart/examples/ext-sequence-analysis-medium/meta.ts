// vchart example: Sequence analysis: medium curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence analysis: medium curves',
  summary:
    'With mediumConnection true the horizontal axis switches from steps to medium types (dots.medium_type) and every link becomes a cubic Bezier curve; links sharing an endpoint get distinct curvature. A switch flips mediumConnection on the same events.',
  section: 'Extensions',
  tags: ['mediumConnection', 'sequenceAnalysis', 'medium_type', 'patternData', 'curves'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/sequence_analysis.md',
    'repo/docs/assets/option/en/chart/sequence-analysis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
