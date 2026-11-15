// The mean point of eight sampled points, as a balance mark
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
  t.cloud = [(random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100)), (random(-150, 150), random(-100, 100))]
  t.com = centerOfMass(t.cloud)
  t.s0 = Line {
    start : t.com
    end : t.cloud[0]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p0 = Circle {
    center : t.cloud[0]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s1 = Line {
    start : t.com
    end : t.cloud[1]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p1 = Circle {
    center : t.cloud[1]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s2 = Line {
    start : t.com
    end : t.cloud[2]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p2 = Circle {
    center : t.cloud[2]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s3 = Line {
    start : t.com
    end : t.cloud[3]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p3 = Circle {
    center : t.cloud[3]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s4 = Line {
    start : t.com
    end : t.cloud[4]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p4 = Circle {
    center : t.cloud[4]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s5 = Line {
    start : t.com
    end : t.cloud[5]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p5 = Circle {
    center : t.cloud[5]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s6 = Line {
    start : t.com
    end : t.cloud[6]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p6 = Circle {
    center : t.cloud[6]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.s7 = Line {
    start : t.com
    end : t.cloud[7]
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.p7 = Circle {
    center : t.cloud[7]
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.mark = Circle {
    center : t.com
    r : 13
    fillColor : #c0392b44
    strokeColor : #c0392b
    strokeWidth : 4
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
