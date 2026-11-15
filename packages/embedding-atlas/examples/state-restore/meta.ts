// embedding-atlas example: save EmbeddingAtlasState as JSON, restore it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Save a state and restore it",
  summary:
    "The state is plain JSON. The atlas starts from a saved string; in the full view brush or reorder charts, press Save to keep the latest state from onStateChange, then Restore to rebuild the atlas from that string, or Reset to go back to the first one.",
  section: "State & Layouts",
  tags: ['initialState', 'onStateChange', 'EmbeddingAtlasState', 'JSON', 'version', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/api.ts',
    'repo/packages/docs/embedding-atlas.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
