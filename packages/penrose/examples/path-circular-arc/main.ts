// Center plus r times (cos t, sin t) for t between two angles
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
  t.c = (0, -10)
  t.r = random(60, 100)
  t.a0 = random(-2.2, -0.2)
  t.a1 = t.a0 + random(1.4, 4)
  t.arc = Path {
    d : circularArc("open", t.c, t.r, t.a0, t.a1)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.full = Circle {
    center : t.c
    r : t.r
    fillColor : none()
    strokeColor : #cccccc
    strokeWidth : 1
  }
  t.c0 = Circle {
    center : t.c
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
  t.p0 = Circle {
    center : t.c + t.r * unitVector(t.a0)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.p1 = Circle {
    center : t.c + t.r * unitVector(t.a1)
    r : 6
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.r0 = Line {
    start : t.c
    end : t.c + t.r * unitVector(t.a0)
    strokeWidth : 1
    strokeColor : #2f6fbf
  }
  t.r1 = Line {
    start : t.c
    end : t.c + t.r * unitVector(t.a1)
    strokeWidth : 1
    strokeColor : #2e8b57
  }
}
`,
    variants: [
      {
        label: '"open"',
      },
      {
        label: '"closed"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.c = (0, -10)
  t.r = random(60, 100)
  t.a0 = random(-2.2, -0.2)
  t.a1 = t.a0 + random(1.4, 4)
  t.arc = Path {
    d : circularArc("closed", t.c, t.r, t.a0, t.a1)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : #c0392b33
  }
  t.full = Circle {
    center : t.c
    r : t.r
    fillColor : none()
    strokeColor : #cccccc
    strokeWidth : 1
  }
  t.c0 = Circle {
    center : t.c
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
  t.p0 = Circle {
    center : t.c + t.r * unitVector(t.a0)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.p1 = Circle {
    center : t.c + t.r * unitVector(t.a1)
    r : 6
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.r0 = Line {
    start : t.c
    end : t.c + t.r * unitVector(t.a0)
    strokeWidth : 1
    strokeColor : #2f6fbf
  }
  t.r1 = Line {
    start : t.c
    end : t.c + t.r * unitVector(t.a1)
    strokeWidth : 1
    strokeColor : #2e8b57
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
