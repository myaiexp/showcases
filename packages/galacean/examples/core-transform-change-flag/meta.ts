// galacean example: Transform: registerWorldChangeFlag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: registerWorldChangeFlag",
  summary:
    "A flag from registerWorldChangeFlag goes true whenever the entity's world matrix changes, the way the Camera knows to rebuild its view matrix. A lamp shows the flag and a counter shows recomputations.",
  section: "Core",
  tags: ['Transform', 'registerWorldChangeFlag', 'BoolUpdateFlag'],
  docs: [
    'repo/docs/en/core/transform.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
