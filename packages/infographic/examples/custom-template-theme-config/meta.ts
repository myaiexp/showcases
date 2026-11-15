// AntV Infographic example: Custom template: a template that carries its own palette
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom template: a template that carries its own palette',
  summary:
    'registerTemplate takes the same options as the constructor minus container and data, so a template can carry a whole themeConfig as well as a design. Here showcase-citrus-steps bundles a sequence-steps design with a citrus palette; the syntax below it is only `infographic showcase-citrus-steps` plus data.',
  section: 'Custom templates',
  tags: ['registerTemplate', 'themeConfig', 'palette', 'TemplateOptions', 'sequence-steps'],
  docs: [
    'repo/site/src/content/learn/custom-template.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
    'repo/site/src/content/learn/template.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
