// AntV Infographic example: template-reuse-built-in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Templates: read a built-in template and register a variant',
  summary:
    'getTemplate returns the options a template stands for. This reads list-row-simple-horizontal-arrow, shows it as JSON in the side panel, then registers a copy with its design changed (a title and a different item) under a new name and draws both.',
  section: 'Templates',
  tags: ['getTemplate', 'registerTemplate', 'template', 'design', 'list-row-simple-horizontal-arrow'],
  docs: [
    'repo/site/src/content/learn/template.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
