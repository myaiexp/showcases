// AntV Infographic example: Syntax: lanes, children and relations for interactions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: lanes, children and relations for interactions',
  summary:
    "The sequence-interaction templates read sequences as swim lanes, each lane's children as nodes with an id and a step, and relations as arrows between node ids. Nodes with the same step sit at the same height.",
  section: 'Infographic syntax',
  tags: ['sequences', 'children', 'step', 'relations', 'sequence-interaction-default-compact-card'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
    'repo/skills/infographic-syntax-creator/references/prompt.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
