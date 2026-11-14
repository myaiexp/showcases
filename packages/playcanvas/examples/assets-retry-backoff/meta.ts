// playcanvas example: Retrying failed loads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retrying failed loads',
  summary:
    "A failed asset load is retried with exponential backoff, and app.loader.enableRetry sets how many times. Three textures point at a blob URL that was revoked, so every attempt fails; the bars grow while retries run and stop, red, when the last one is given up. More retries mean a longer wait before the error event.",
  section: 'Assets',
  tags: ['ResourceLoader', 'enableRetry', 'disableRetry', 'maxRetries', 'Asset', 'error', 'AssetRegistry'],
  docs: [
    'repo/docs/user-manual/assets/loading-unloading.md',
    'repo/docs/user-manual/assets/asset-registry.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
