// Subset with and without a lower bound on circle radius
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'ensure r > 25',

      },
      {
        label: 'no size bound',
        style: `canvas {
  width = 600
  height = 450
}
-- (degenerate on purpose)
forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 5.0)
  A.icon above B.icon
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
}
`,
      },
    ],
    domain: `type Set
predicate Subset(Set s1, Set s2)
`,
    substance: `Set A, B, C
Subset(B, A)
Subset(C, B)
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 5.0)
  A.icon above B.icon
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}
`,
  });
  return () => stage.dispose();
};

export default mount;
