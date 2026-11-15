// Eight points in 3D, projected to the plane by minimising a t-SNE energy
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
  t.hi = [(0 + random(-1, 1), 0 + random(-1, 1), 0 + random(-1, 1)), (0 + random(-1, 1), 0 + random(-1, 1), 0 + random(-1, 1)), (0 + random(-1, 1), 0 + random(-1, 1), 0 + random(-1, 1)), (0 + random(-1, 1), 0 + random(-1, 1), 0 + random(-1, 1)), (6 + random(-1, 1), 6 + random(-1, 1), 6 + random(-1, 1)), (6 + random(-1, 1), 6 + random(-1, 1), 6 + random(-1, 1)), (6 + random(-1, 1), 6 + random(-1, 1), 6 + random(-1, 1)), (6 + random(-1, 1), 6 + random(-1, 1), 6 + random(-1, 1))]
  t.q0 = (?[-120], ?[-40])
  ensure abs(t.q0[0]) < 160
  ensure abs(t.q0[1]) < 110
  t.q1 = (?[-90], ?[40])
  ensure abs(t.q1[0]) < 160
  ensure abs(t.q1[1]) < 110
  t.q2 = (?[-60], ?[-40])
  ensure abs(t.q2[0]) < 160
  ensure abs(t.q2[1]) < 110
  t.q3 = (?[-30], ?[40])
  ensure abs(t.q3[0]) < 160
  ensure abs(t.q3[1]) < 110
  t.q4 = (?[0], ?[-40])
  ensure abs(t.q4[0]) < 160
  ensure abs(t.q4[1]) < 110
  t.q5 = (?[30], ?[40])
  ensure abs(t.q5[0]) < 160
  ensure abs(t.q5[1]) < 110
  t.q6 = (?[60], ?[-40])
  ensure abs(t.q6[0]) < 160
  ensure abs(t.q6[1]) < 110
  t.q7 = (?[90], ?[40])
  ensure abs(t.q7[0]) < 160
  ensure abs(t.q7[1]) < 110
  t.lo = [t.q0, t.q1, t.q2, t.q3, t.q4, t.q5, t.q6, t.q7]
  encourage minimal(tsneEnergy(t.hi, t.lo))
  t.c0 = Circle {
    center : t.q0
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c1 = Circle {
    center : t.q1
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c2 = Circle {
    center : t.q2
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c3 = Circle {
    center : t.q3
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c4 = Circle {
    center : t.q4
    r : 7
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.c5 = Circle {
    center : t.q5
    r : 7
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.c6 = Circle {
    center : t.q6
    r : 7
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.c7 = Circle {
    center : t.q7
    r : 7
    fillColor : #2f6fbf
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
