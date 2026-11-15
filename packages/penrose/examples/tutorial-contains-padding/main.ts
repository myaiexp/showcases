// contains with padding 5, 30 and 60 changes the gap between nested circles
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'padding 5.0',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 5.0)
  A.icon above B.icon
  ensure B.icon.r < 190
}
`,
      },
      {
        label: 'padding 30.0',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 30.0)
  A.icon above B.icon
  ensure B.icon.r < 190
}
`,
      },
      {
        label: 'padding 60.0',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 60.0)
  A.icon above B.icon
  ensure B.icon.r < 190
}
`,
      },
    ],
    domain: `type Set
predicate Subset(Set s1, Set s2)
`,
    substance: `Set A, B
Subset(A, B)
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 5.0)
  A.icon above B.icon
  ensure B.icon.r < 190
}
`,
  });
  return () => stage.dispose();
};

export default mount;
