// galacean example: Engine: vSyncCount and targetFrameRate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Engine: vSyncCount and targetFrameRate",
  summary:
    "Frame pacing: vSyncCount 1 follows the display, 2 renders every second refresh, and 0 with targetFrameRate sets a fixed rate. The readout measures the frames actually delivered.",
  section: "Core",
  tags: ['Engine', 'vSyncCount', 'targetFrameRate'],
  docs: [
    'repo/docs/en/core/engine.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
