// galacean example: Assets: AssetPromise.onProgress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: AssetPromise.onProgress",
  summary:
    "A batch of loads reports progress through onProgress(loaded, total). The items go through a small custom loader that takes a moment each, so the bar can be seen filling.",
  section: "Assets",
  tags: ['AssetPromise', 'onProgress', 'ResourceManager', 'load', 'resourceLoader', 'Loader'],
  docs: [
    'repo/docs/en/assets/load.mdx',
    'repo/docs/en/assets/custom.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
