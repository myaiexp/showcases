// galacean example: Time: timeScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time: timeScale",
  summary:
    "engine.time.timeScale slows or speeds everything driven by deltaTime while actualDeltaTime ignores it. Two spinners, one per clock, and a readout for every Time property.",
  section: "Core",
  tags: ['Time', 'timeScale', 'deltaTime', 'actualDeltaTime', 'elapsedTime', 'frameCount'],
  docs: [
    'repo/docs/en/core/time.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
