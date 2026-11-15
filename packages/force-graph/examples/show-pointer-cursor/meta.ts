// force-graph example: Interaction: showPointerCursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: showPointerCursor',
  summary:
    'showPointerCursor takes a function of the object under the pointer. Only the orange group answers true, so the cursor over those nodes becomes a pointer and stays an arrow elsewhere; the status line reads the resolved cursor.',
  section: 'Interaction',
  tags: ['showPointerCursor', 'onNodeClick', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
