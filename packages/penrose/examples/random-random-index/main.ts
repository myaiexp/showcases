// Whole-number steps from randomIndex scale five discs
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot A, B, C, D, E
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 14 * randomIndex(1, 5)
    fillColor : rgba(0.4, 0.7, 0.5, 0.8)
    strokeColor : #1f5c44
    strokeWidth : 2
  }
}

forall Dot a; Dot b {
  ensure disjoint(a.icon, b.icon, 6)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
