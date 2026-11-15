// The four arcs between two points chosen by largeArc and arcSweep
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'largeArc 0, arcSweep 0',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, 0)
  t.p1 = (70, 0)
  t.dotA = Circle {
    center : t.p0
    r : 6
    fillColor : #c0392b
  }
  t.dotB = Circle {
    center : t.p1
    r : 6
    fillColor : #2a6f97
  }
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (80, 80), 0, 0, 0)
    strokeWidth : 5
    strokeColor : #333333
  }
}
`,
      },
      {
        label: 'largeArc 0, arcSweep 1',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, 0)
  t.p1 = (70, 0)
  t.dotA = Circle {
    center : t.p0
    r : 6
    fillColor : #c0392b
  }
  t.dotB = Circle {
    center : t.p1
    r : 6
    fillColor : #2a6f97
  }
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (80, 80), 0, 0, 1)
    strokeWidth : 5
    strokeColor : #333333
  }
}
`,
      },
      {
        label: 'largeArc 1, arcSweep 0',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, 0)
  t.p1 = (70, 0)
  t.dotA = Circle {
    center : t.p0
    r : 6
    fillColor : #c0392b
  }
  t.dotB = Circle {
    center : t.p1
    r : 6
    fillColor : #2a6f97
  }
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (80, 80), 0, 1, 0)
    strokeWidth : 5
    strokeColor : #333333
  }
}
`,
      },
      {
        label: 'largeArc 1, arcSweep 1',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.p0 = (-70, 0)
  t.p1 = (70, 0)
  t.dotA = Circle {
    center : t.p0
    r : 6
    fillColor : #c0392b
  }
  t.dotB = Circle {
    center : t.p1
    r : 6
    fillColor : #2a6f97
  }
  t.curve = Path {
    d : arc("open", t.p0, t.p1, (80, 80), 0, 1, 1)
    strokeWidth : 5
    strokeColor : #333333
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
