// tsl-textures example: Translator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Translator',
  summary:
    'translator() on positionNode and translator.normal() on normalNode: vertices above a tilted selection layer move by a distance vector and those inside it move partly, so a sphere stretches out like dough.',
  section: 'Shape textures',
  tags: ['translator', 'positionNode', 'normalNode', 'distance', 'selectorAngles'],
  docs: ['repo/docs/translator.md', 'repo/src/translator.js', 'repo/index.html', 'repo/docs/grid.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
