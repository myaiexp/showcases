// playcanvas example: The preload flag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The preload flag',
  summary:
    "Assets flagged preload are loaded by app.preload before the app starts, so a script's initialize already finds their resource; assets without the flag stay null until something loads them and then pop in. The log shows the preload events and each initialize, and the full view streams and unloads the rest.",
  section: 'Assets',
  tags: ['Asset', 'preload', 'AppBase.preload', 'preload:progress', 'AssetRegistry', 'ready', 'Script'],
  docs: [
    'repo/docs/user-manual/assets/preloading.md',
    'repo/docs/user-manual/assets/index.md',
    'repo/docs/user-manual/assets/loading-unloading.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
