// galacean example: Assets: cancelNotLoaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: cancelNotLoaded",
  summary:
    "Slow loads queued, then resourceManager.cancelNotLoaded(url) cancels one, or cancelNotLoaded() all; a cancelled load rejects, as the docs warn, and the log shows which resolved.",
  section: "Assets",
  tags: ['ResourceManager', 'cancelNotLoaded', 'AssetPromise', 'load'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
