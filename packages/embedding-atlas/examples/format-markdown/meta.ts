// embedding-atlas example: the markdown renderer on a column of Markdown text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Markdown column",
  summary:
    "columnStyles { note: { renderer: \"markdown\" } } renders the note column as formatted Markdown: a heading, emphasis, a list, a link and inline code, in the instances table.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: markdown', 'instances'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/types.ts',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
