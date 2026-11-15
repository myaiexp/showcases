// Start, two controls, end, then pairs of control and end
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
  t.h1 = random(30, 100)
  t.h2 = random(30, 100)
  t.pts = [(-150, -60), (-140, t.h1), (-70, t.h2), (-20, 0), (50, -t.h2), (140, 50)]
  t.curve = Path {
    d : cubicCurveFromPoints("open", t.pts)
    strokeColor : #2e8b57
    strokeWidth : 4
    fillColor : none()
  }
  t.t0 = Line {
    start : t.pts[0]
    end : t.pts[1]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.t1 = Line {
    start : t.pts[2]
    end : t.pts[3]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.t2 = Line {
    start : t.pts[3]
    end : t.pts[4]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.t3 = Line {
    start : t.pts[4]
    end : t.pts[5]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.p0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p3 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p5 = Circle {
    center : t.pts[5]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.c1 = Circle {
    center : t.pts[1]
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c2 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c4 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
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
  t.h1 = random(30, 100)
  t.h2 = random(30, 100)
  t.pts = [(-150, -60), (-140, t.h1), (-70, t.h2), (-20, 0), (50, -t.h2), (140, 50)]
  t.curve = Path {
    d : cubicCurveFromPoints("closed", t.pts)
    strokeColor : #2e8b57
    strokeWidth : 4
    fillColor : #2e8b5744
  }
  t.t0 = Line {
    start : t.pts[0]
    end : t.pts[1]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.t1 = Line {
    start : t.pts[2]
    end : t.pts[3]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.t2 = Line {
    start : t.pts[3]
    end : t.pts[4]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.t3 = Line {
    start : t.pts[4]
    end : t.pts[5]
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.p0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p3 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p5 = Circle {
    center : t.pts[5]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.c1 = Circle {
    center : t.pts[1]
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c2 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.c4 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #c0392b
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
