// penrose example: nonDegenerateAngle: bending a flat angle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "nonDegenerateAngle: bending a flat angle",
  summary:
    'Three points are pulled onto one horizontal line, so the angle at B is flat. `encourage nonDegenerateAngle(a, b, c, strength)` penalises angles near 0 and 180 degrees. A flat angle is a stationary point of that penalty, so the default strength of 20 cannot win against the pull; a strength of 20000 pushes B off the line.',
  section: "Objective Functions",
  tags: ['nonDegenerateAngle', 'encourage', 'objective', 'angle', 'nearPt'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
