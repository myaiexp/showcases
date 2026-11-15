// AntV Infographic example: Custom structure: BtnAdd and BtnRemove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom structure: BtnAdd and BtnRemove',
  summary:
    'A vertical Stack structure that places a BtnRemove beside each item and a BtnAdd above, below and between them, each given the indexes it acts on. The buttons end up in the SVG as markers, but 0.2.20 hides their group (display: none) and no editor code wires them, so nothing is drawn or clickable yet. Registered as showcase-stack.',
  section: 'Custom structures',
  tags: ['registerStructure', 'BtnAdd', 'BtnRemove', 'BtnsGroup', 'indexes', 'editable'],
  docs: [
    'repo/site/src/content/learn/custom-structure.en.md',
    'repo/skills/infographic-structure-creator/references/structure-prompt.md',
    'repo/site/src/content/reference/infographic-exports.en.md',
    'repo/site/src/content/learn/editor.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
