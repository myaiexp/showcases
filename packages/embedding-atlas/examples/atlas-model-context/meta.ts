// embedding-atlas example: the modelContext prop and the tools Atlas registers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Model context tools',
  summary:
    'modelContext is an object with provideContext(context): Atlas calls it with the tools it offers an assistant (name, description, JSON-schema input and an execute function). Twenty-eight tools arrive (data_schema, data_query, chart_*, layout_*, column_style_*, screenshots). This example is the receiving side: pick one, edit its JSON input and read the response.',
  section: 'EmbeddingAtlas',
  tags: ['modelContext', 'provideContext', 'MCPTool', 'execute', 'inputSchema'],
  docs: ['repo/packages/viewer/src/api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
