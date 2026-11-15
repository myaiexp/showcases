// An arm of random length rotates towards a point it may not reach
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variations: ['arm-1', 'arm-2', 'arm-3', 'arm-4'],
    domain: `type Dot
`,
    substance: `Dot A
`,
    style: `canvas {
  width = 400
  height = 300
}

arm {
  scalar L = random(50, 200) -- fixed, the optimizer cannot grow or shrink it
  scalar theta = ?           -- free, the optimizer turns it
  vec2 p = (110, 60)
  vec2 v = L * (cos(theta), sin(theta))
  encourage norm(v - p) == 0

  target = Circle {
    center : p
    r : 8
    fillColor : #d94f4f
  }
  rod = Line {
    start : (0, 0)
    end : v
    strokeWidth : 6
    strokeColor : #1a3a6b
    strokeLinecap : "round"
  }
  pivot = Circle {
    center : (0, 0)
    r : 8
    fillColor : #1a3a6b
  }
  rod below pivot
}
`,
  });
  return () => stage.dispose();
};

export default mount;
