// A filled angle marker whose sweep direction follows the rays
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
  t.V = (-60, -30)
  t.a1 = random(-0.5, 0.5)
  t.a2 = t.a1 + sign(random(-1, 1)) * random(0.9, 2.1)
  t.P1 = t.V + 150 * unitVector(t.a1)
  t.P2 = t.V + 150 * unitVector(t.a2)
  t.S = ptOnLine(t.V, t.P1, 70)
  t.E = ptOnLine(t.V, t.P2, 70)
  t.flag = arcSweepFlag(t.V, t.S, t.E)
  t.sector = Path {
    d : wedge(t.V, t.S, t.E, (70, 70), 0, 0, t.flag)
    fillColor : #e08a1e66
    strokeColor : #e08a1e
    strokeWidth : 3
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
  t.s = Circle {
    center : t.S
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.e = Circle {
    center : t.E
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.v = Circle {
    center : t.V
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
