// AntV Infographic example: Custom structure: connectors under the items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: connectors under the items',
  summary:
    'Chevrons puts a Polygon arrow between neighbouring items. The skill reference says decoration belongs in its own Group placed before ItemsGroup so it paints under the items; the arrows take the theme primary colour. Registered as showcase-chevrons, with the number of items changing between steps.',
  section: 'Custom structures',
  tags: ['registerStructure', 'Polygon', 'Group', 'ItemsGroup', 'getThemeColors', 'layer order'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
