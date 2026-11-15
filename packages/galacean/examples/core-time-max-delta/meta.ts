// galacean example: Time: maximumDeltaTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time: maximumDeltaTime",
  summary:
    "A stall in one frame would send a huge deltaTime into every script. maximumDeltaTime caps it while actualDeltaTime keeps the truth; a button forces a stall and the panel shows both numbers.",
  section: "Core",
  tags: ['Time', 'maximumDeltaTime', 'deltaTime', 'actualDeltaTime'],
  docs: [
    'repo/docs/en/core/time.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
