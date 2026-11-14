// observable-plot example: Tree: flare package hierarchy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tree: flare package hierarchy',
  summary:
    'A software package hierarchy from flare.csv drawn with Plot.tree: the path option names the column and delimiter splits the dotted names. Pick one package, or the whole 250-node tree.',
  section: 'Mark: Tree',
  tags: ['tree', 'path', 'delimiter', 'textStroke'],
  docs: ['repo/docs/marks/tree.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
