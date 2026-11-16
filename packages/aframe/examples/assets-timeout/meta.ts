// aframe example: a-assets timeout: start rendering without the slow asset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'a-assets timeout: start rendering without the slow asset',
  summary:
    'A video with preload="auto" and no source never finishes loading, so the scene would wait; a-assets timeout="1500" gives up, emits timeout and then loaded. The board shows the times.',
  section: 'Core API',
  tags: ['a-assets', 'timeout', 'video', 'preload', 'loaded'],
  docs: ['repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
