// zephyr3d example: Instancing: createInstance batches one draw call
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Instancing: createInstance batches one draw call',
  summary:
    'A waving grid of boxes that share one BoxShape and use instances of one LambertMaterial, each with its own colour. The render queue batches them into instanced draws; turn createInstance off and every box gets its own material and draw call. The caption reads device.frameInfo.drawCalls.',
  section: 'Geometry Instancing',
  tags: ['createInstance', 'instancing', 'dynamic batching', 'frameInfo.drawCalls'],
  docs: ['repo/apps/doc/web/en/instancing-intro.md', 'repo/apps/doc/web/en/performance.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
