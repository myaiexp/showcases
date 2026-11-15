// galacean example: Assets: retryCount, retryInterval and timeout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Assets: retryCount, retryInterval and timeout",
  summary:
    "A load that cannot succeed (a revoked blob URL) with different retryCount and retryInterval values: more retries take longer to fail, and the log times each attempt to the final error.",
  section: "Assets",
  tags: ['LoadItem', 'retryCount', 'retryInterval', 'timeout', 'ResourceManager', 'load'],
  docs: [
    'repo/docs/en/assets/load.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
