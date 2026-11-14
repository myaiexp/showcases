// vchart example: KDE and ECDF over a histogram
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'KDE and ECDF over a histogram',
  summary:
    'appendHistogramRegressionLineConfig overlays a kernel density estimate and an empirical cumulative distribution curve on a binned histogram. The bin transform step sets the bar widths; the card resamples the data so both curves refit.',
  section: 'Extensions',
  tags: ['appendHistogramRegressionLineConfig', 'kde', 'ecdf', 'bin', 'histogram', 'registerRegressionLine'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/regression_line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
