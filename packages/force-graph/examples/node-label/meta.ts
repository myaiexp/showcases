// force-graph example: Node styling: nodeLabel as text and HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node styling: nodeLabel as text and HTML',
  summary:
    'nodeLabel decides what the hover tooltip says. A string is read as an attribute name (plain text); a function can return an HTML string, here a bold name, the team and a role line.',
  section: 'Node styling',
  tags: ['nodeLabel', 'nodeAutoColorBy', 'nodeRelSize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
