// vchart example: Conversion funnel with rate arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Conversion funnel with rate arrows',
  summary:
    'The conversionFunnel chart adds arrows between funnel layers, each labelled with the conversion rate that conversionArrow.text.formatMethod computes from the two layers\' values, and a funnelBackground behind every layer. The card cycles the funnel\'s values and the rates follow.',
  section: 'Extensions',
  tags: ['conversionFunnel', 'registerConversionFunnelChart', 'conversionArrow', 'arrows', 'formatMethod', 'funnelBackground'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/conversion_funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
