// An arc along an ellipse with unequal radii and a rotation
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'radius (80, 80)',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, -20)
  t.p1 = (70, -20)
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (80, 80), 0, 0, 1)
    strokeWidth : 5
    strokeColor : #7a3a00
    endArrowhead : "straight"
    endArrowheadSize : 1
  }
  t.tail = Circle {
    center : t.p0
    r : 6
    fillColor : #333333
  }
}
`,
      },
      {
        label: 'radius (130, 50)',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, -20)
  t.p1 = (70, -20)
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (130, 50), 0, 0, 1)
    strokeWidth : 5
    strokeColor : #7a3a00
    endArrowhead : "straight"
    endArrowheadSize : 1
  }
  t.tail = Circle {
    center : t.p0
    r : 6
    fillColor : #333333
  }
}
`,
      },
      {
        label: 'radius (130, 50), rotation 40',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, -20)
  t.p1 = (70, -20)
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (130, 50), 40, 0, 1)
    strokeWidth : 5
    strokeColor : #7a3a00
    endArrowhead : "straight"
    endArrowheadSize : 1
  }
  t.tail = Circle {
    center : t.p0
    r : 6
    fillColor : #333333
  }
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
