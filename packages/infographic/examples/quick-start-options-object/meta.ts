// AntV Infographic example: Quick start: an options object instead of syntax
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start: an options object instead of syntax',
  summary:
    'Infographic.render() accepts a syntax string or a partial options object. Here the same data object is rendered with a different template id in each step, by passing { template, data, theme } instead of text.',
  section: 'Quick start',
  tags: ['render', 'template', 'data', 'theme', 'InfographicOptions'],
  docs: [
    'repo/site/src/content/learn/index.en.md',
    'repo/site/src/content/reference/infographic-api.en.md',
    'repo/site/src/content/reference/infographic-options.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
