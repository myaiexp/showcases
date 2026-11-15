// Circle radii drawn once from random(min, max), different per variation
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot A, B, C, D
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : random(20, 65)
    fillColor : rgba(0.3, 0.6, 0.85, 0.8)
    strokeColor : #1a3a6b
    strokeWidth : 2
  }
}

forall Dot a; Dot b {
  ensure disjoint(a.icon, b.icon, 8)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
