// Three queries treat a group of shapes as one object
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
  width = 480
  height = 360
}

forall Thing t {
  t.c = Circle {
    center : (-60, 50)
    r : 40
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.r = Rectangle {
    center : (60, 40)
    width : 80
    height : 60
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.p = Polygon {
    points : [(-50, -50), (60, -60), (10, -130)]
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.g = Group {
    shapes : [t.c, t.r, t.p]
  }
  t.q = (random(110, 180), random(-130, -60))
  t.O = (-210, random(60, 100))
  t.d = unitVector(random(-0.35, -0.1))
  t.ring = Circle {
    center : t.q
    r : abs(signedDistanceGroup([t.c, t.r, t.p], t.q)) + 0.5
    fillColor : none()
    strokeColor : #2f6fbf
    strokeWidth : 2
    strokeStyle : "dashed"
    ensureOnCanvas : false
  }
  t.ray = Line {
    start : t.O
    end : t.O + 480 * t.d
    strokeWidth : 1
    strokeColor : #bbbbbb
    strokeStyle : "dashed"
  }
  t.qDot = Circle {
    center : t.q
    r : 6
    fillColor : #333333
    strokeWidth : 0
  }
  t.near = Circle {
    center : closestPoint(t.g, t.q)
    r : 7
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.origin = Circle {
    center : t.O
    r : 6
    fillColor : #333333
    strokeWidth : 0
  }
  t.hit = Circle {
    center : rayIntersect(t.g, t.O, t.d)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
