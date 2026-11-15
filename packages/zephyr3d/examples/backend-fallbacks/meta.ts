// zephyr3d example: WebGL2 fallbacks and their console warnings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WebGL2 fallbacks and their console warnings',
  summary:
    'Two WebGPU-only features from the docs\' backend table, A-buffer OIT and deep opacity map shadows, switched on under WebGL2. Nothing throws and the properties still read what was set; the engine logs a [zephyr3d] warning once per feature and falls back (sorted blending, PCF). The read-out collects those warnings.',
  section: 'Advanced Topics',
  tags: ['getDevice().type', 'oitMode', 'shadow.mode', 'WebGL2', 'fallback'],
  docs: ['repo/apps/doc/web/en/backend-support.md', 'repo/apps/doc/web/en/oit.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
