// AntV Infographic example: Custom resource loader: a showcase: scheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom resource loader: a showcase: scheme',
  summary:
    'registerResourceLoader receives every icon name the infographic cannot resolve by itself. This loader claims names that start with `showcase:`, answers them with hand-made SVG paths wrapped by loadSVGResource, and passes everything else to the gallery’s offline icons. The steps mix the two kinds of name.',
  section: 'Custom resource loader',
  tags: ['registerResourceLoader', 'loadSVGResource', 'ResourceConfig', 'protocol', 'icon'],
  docs: [
    'repo/site/src/content/learn/custom-resource-loader.en.md',
    'repo/site/src/content/learn/resources.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
