// A Penrose-triangle-style ring with sampled rotation and hole size
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.angle = random(0, 6.28)
  t.hole = 0.4 + random(-0.05, 0.1)
  t.shape = Path {
    d : Penrose((0, 0), 105, t.hole, t.angle, 3, "ccw")
    fillColor : #7a4fbf88
    strokeColor : #4a2f7a
    strokeWidth : 3
  }
}
`,
    variants: [
      {
        label: '3 sides, "ccw"',
      },
      {
        label: '3 sides, "cw"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.angle = random(0, 6.28)
  t.hole = 0.4 + random(-0.05, 0.1)
  t.shape = Path {
    d : Penrose((0, 0), 105, t.hole, t.angle, 3, "cw")
    fillColor : #7a4fbf88
    strokeColor : #4a2f7a
    strokeWidth : 3
  }
}
`,
      },
      {
        label: '4 sides, "ccw"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.angle = random(0, 6.28)
  t.hole = 0.45 + random(-0.05, 0.1)
  t.shape = Path {
    d : Penrose((0, 0), 105, t.hole, t.angle, 4, "ccw")
    fillColor : #7a4fbf88
    strokeColor : #4a2f7a
    strokeWidth : 3
  }
}
`,
      },
      {
        label: '5 sides, "cw"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.angle = random(0, 6.28)
  t.hole = 0.5 + random(-0.05, 0.1)
  t.shape = Path {
    d : Penrose((0, 0), 105, t.hole, t.angle, 5, "cw")
    fillColor : #7a4fbf88
    strokeColor : #4a2f7a
    strokeWidth : 3
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
