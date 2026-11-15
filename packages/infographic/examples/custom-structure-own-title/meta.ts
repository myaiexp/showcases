// AntV Infographic example: Custom structure: drawing data.title itself
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: drawing data.title itself',
  summary:
    'Banner ignores the Title prop and draws data.title and data.desc in its own Rect and Text banner above the items. The design block has no title line at all. Because the structure renders the title, its composites still list title; the steps change the title text.',
  section: 'Custom structures',
  tags: ['registerStructure', 'composites', 'data.title', 'Title', 'Text', 'Rect'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/reference/infographic-types.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
