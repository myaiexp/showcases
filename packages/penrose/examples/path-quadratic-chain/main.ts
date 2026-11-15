// One control point, then smooth joins, open or closed
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
  t.h = random(30, 90)
  t.pts = [(-150, -50), (-110, t.h - 50), (-70, -50), (0, -50), (70, 30)]
  t.curve = Path {
    d : quadraticCurveFromPoints("open", t.pts)
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.guide = Polyline {
    points : t.pts
    strokeColor : #bbbbbb
    strokeWidth : 1
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.p0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.cp = Circle {
    center : t.pts[1]
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.p1 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p2 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p3 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #333333
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
  t.h = random(30, 90)
  t.pts = [(-150, -50), (-110, t.h - 50), (-70, -50), (0, -50), (70, 30)]
  t.curve = Path {
    d : quadraticCurveFromPoints("closed", t.pts)
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : #4f8fdc44
  }
  t.guide = Polyline {
    points : t.pts
    strokeColor : #bbbbbb
    strokeWidth : 1
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.p0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.cp = Circle {
    center : t.pts[1]
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.p1 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p2 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.p3 = Circle {
    center : t.pts[4]
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
