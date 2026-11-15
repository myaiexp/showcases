// One, two or three concentric arcs inside a sampled angle
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
  t.V = (-50, -30)
  t.a1 = random(-0.4, 0.4)
  t.a2 = t.a1 + random(0.8, 2)
  t.P1 = t.V + 160 * unitVector(t.a1)
  t.P2 = t.V + 160 * unitVector(t.a2)
  t.flag = arcSweepFlag(t.V, ptOnLine(t.V, t.P1, 50), ptOnLine(t.V, t.P2, 50))
  t.marks = Path {
    d : repeatedArcs(ptOnLine(t.V, t.P1, 50), ptOnLine(t.V, t.P2, 50), ptOnLine(t.V, t.P1, 60), ptOnLine(t.V, t.P2, 60), (50, 50), 1, 10, t.flag)
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.ray1 = Line {
    start : t.V
    end : t.P1
    strokeWidth : 3
    strokeColor : #333333
  }
  t.ray2 = Line {
    start : t.V
    end : t.P2
    strokeWidth : 3
    strokeColor : #333333
  }
  t.v = Circle {
    center : t.V
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'repeat 1',
      },
      {
        label: 'repeat 2',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.V = (-50, -30)
  t.a1 = random(-0.4, 0.4)
  t.a2 = t.a1 + random(0.8, 2)
  t.P1 = t.V + 160 * unitVector(t.a1)
  t.P2 = t.V + 160 * unitVector(t.a2)
  t.flag = arcSweepFlag(t.V, ptOnLine(t.V, t.P1, 50), ptOnLine(t.V, t.P2, 50))
  t.marks = Path {
    d : repeatedArcs(ptOnLine(t.V, t.P1, 50), ptOnLine(t.V, t.P2, 50), ptOnLine(t.V, t.P1, 60), ptOnLine(t.V, t.P2, 60), (50, 50), 2, 10, t.flag)
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.ray1 = Line {
    start : t.V
    end : t.P1
    strokeWidth : 3
    strokeColor : #333333
  }
  t.ray2 = Line {
    start : t.V
    end : t.P2
    strokeWidth : 3
    strokeColor : #333333
  }
  t.v = Circle {
    center : t.V
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'repeat 3',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.V = (-50, -30)
  t.a1 = random(-0.4, 0.4)
  t.a2 = t.a1 + random(0.8, 2)
  t.P1 = t.V + 160 * unitVector(t.a1)
  t.P2 = t.V + 160 * unitVector(t.a2)
  t.flag = arcSweepFlag(t.V, ptOnLine(t.V, t.P1, 50), ptOnLine(t.V, t.P2, 50))
  t.marks = Path {
    d : repeatedArcs(ptOnLine(t.V, t.P1, 50), ptOnLine(t.V, t.P2, 50), ptOnLine(t.V, t.P1, 60), ptOnLine(t.V, t.P2, 60), (50, 50), 3, 10, t.flag)
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.ray1 = Line {
    start : t.V
    end : t.P1
    strokeWidth : 3
    strokeColor : #333333
  }
  t.ray2 = Line {
    start : t.V
    end : t.P2
    strokeWidth : 3
    strokeColor : #333333
  }
  t.v = Circle {
    center : t.V
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
