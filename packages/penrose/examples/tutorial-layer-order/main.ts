// The same overlapping pair stacked in either order with above and below
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'A above B',

      },
      {
        label: 'A below B',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 3.0
    strokeColor : #333333
    fillColor : rgba(0.9, 0.5, 0.3, 1.0)
  }
  ensure x.icon.r > 70
  ensure x.icon.r < 120
}

forall Set A; Set B
where Intersecting(A, B) {
  ensure overlapping(A.icon, B.icon)
  A.icon below B.icon
}
`,
      },
    ],
    domain: `type Set
predicate Intersecting(Set s1, Set s2)
`,
    substance: `Set A, B
Intersecting(A, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 3.0
    strokeColor : #333333
    fillColor : rgba(0.9, 0.5, 0.3, 1.0)
  }
  ensure x.icon.r > 70
  ensure x.icon.r < 120
}

forall Set A; Set B
where Intersecting(A, B) {
  ensure overlapping(A.icon, B.icon)
  A.icon above B.icon
}
`,
  });
  return () => stage.dispose();
};

export default mount;
