// AntV Infographic example: Templates: the built-in template families
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Templates: the built-in template families',
  summary:
    'Built-in templates are named by family: list, sequence, hierarchy, compare, chart and relation. Each step picks the first template id of a family from getTemplates() and gives it the data field that family reads. The side panel shows how many templates are registered.',
  section: 'Templates',
  tags: ['getTemplates', 'template', 'list-', 'sequence-', 'hierarchy-', 'compare-', 'chart-', 'relation-'],
  docs: [
    'repo/site/src/content/learn/template.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/built-in-templates.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
