// Concentric circles: center pinned, radii left for the optimizer
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
predicate Inside(Thing a, Thing b)
`,
    substance: `Thing A, B, C
Inside(A, B)
Inside(B, C)
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    center : (0, 0)
    strokeWidth : 3
    strokeColor : #333333
  }
  ensure t.icon.r > 20
  ensure t.icon.r < 135
}

forall Thing a; Thing b
where Inside(a, b) {
  ensure a.icon.r < b.icon.r - 18
  b.icon below a.icon
}
`,
  });
  return () => stage.dispose();
};

export default mount;
