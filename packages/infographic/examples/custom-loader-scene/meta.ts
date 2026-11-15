// AntV Infographic example: Custom resource loader: icon and illus handled apart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom resource loader: icon and illus handled apart',
  summary:
    'The config a loader gets carries scene, "icon" or "illus", next to the keyword. This loader draws a small picture for the illus names sunrise and night and a plain glyph for icon names, and leaves any other keyword to the offline loader. The steps change which scene each item asks for.',
  section: 'Custom resource loader',
  tags: ['registerResourceLoader', 'scene', 'illus', 'icon', 'loadSVGResource', 'simple-illus'],
  docs: [
    'repo/site/src/content/learn/custom-resource-loader.en.md',
    'repo/site/src/content/learn/resources.en.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
