// fabric example: Clip paths: Text as a clip path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Clip paths: Text as a clip path',
  summary:
    "A FabricText assigned to group.clipPath works like a stencil: the group shows only inside the glyphs. In the full view the text and its size are editable.",
  section: 'Clip paths',
  tags: ['clipPath', 'FabricText', 'Group', 'loadFonts'],
  docs: ['repo/src/content/docs/docs/Old docs/clippath-part2.mdx', 'repo/src/content/docs/docs/Old docs/clippath-part2.jsx', 'repo/src/content/docs/api/classes/FabricText.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
