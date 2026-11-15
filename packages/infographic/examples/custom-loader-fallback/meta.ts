// AntV Infographic example: Custom resource loader: a placeholder when loading fails
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom resource loader: a placeholder when loading fails',
  summary:
    'Returning null from a loader would send the keyword to the online icon search, so a failing loader should answer with a placeholder instead. This one throws for names that start with `broken-`, catches it and returns a dashed question-mark box; the steps break none, one and all of the items.',
  section: 'Custom resource loader',
  tags: ['registerResourceLoader', 'error handling', 'fallback', 'placeholder', 'loadSVGResource'],
  docs: [
    'repo/site/src/content/learn/custom-resource-loader.en.md',
    'repo/site/src/content/learn/resources.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
