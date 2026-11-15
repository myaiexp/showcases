// embedding-atlas example: the messages renderer on OpenAI-format message lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chat messages renderer",
  summary:
    "Each row of the chat column holds a list of { role, content } messages (OpenAI format), built in DuckDB as a STRUCT list. { renderer: \"messages\" } draws them as a conversation with a bubble per role.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: messages', 'OpenAI format'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
