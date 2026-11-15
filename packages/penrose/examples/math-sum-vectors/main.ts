// Four sampled vectors laid end to end and their sum
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
  t.vs = [random(40, 90) * unitVector(random(-0.5, 0.9)), random(40, 90) * unitVector(random(0.2, 1.4)), random(40, 90) * unitVector(random(-1.2, 0.3)), random(40, 90) * unitVector(random(0, 1))]
  t.o = (-130, -70)
  t.p1 = t.o + t.vs[0]
  t.p2 = t.p1 + t.vs[1]
  t.p3 = t.p2 + t.vs[2]
  t.p4 = t.p3 + t.vs[3]
  t.a0 = Line {
    start : t.o
    end : t.p1
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.a1 = Line {
    start : t.p1
    end : t.p2
    strokeWidth : 3
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.a2 = Line {
    start : t.p2
    end : t.p3
    strokeWidth : 3
    strokeColor : #e08a1e
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.a3 = Line {
    start : t.p3
    end : t.p4
    strokeWidth : 3
    strokeColor : #7a4fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.total = Line {
    start : t.o
    end : t.o + sumVectors(t.vs)
    strokeWidth : 6
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.start = Circle {
    center : t.o
    r : 6
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
