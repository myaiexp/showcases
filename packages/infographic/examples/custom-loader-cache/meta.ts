// AntV Infographic example: Custom resource loader: a cache and a call counter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom resource loader: a cache and a call counter',
  summary:
    'The cache recipe from the docs, with numbers: a Map keyed by scene and name holds each loaded symbol, and the side panel counts loads against cache hits. The steps render three icons, the same three again, and then a fourth new one, so the counts show what the loader had to fetch each time.',
  section: 'Custom resource loader',
  tags: ['registerResourceLoader', 'cache', 'Map', 'loadSVGResource', 'performance'],
  docs: [
    'repo/site/src/content/learn/custom-resource-loader.en.md',
    'repo/site/src/content/learn/resources.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
