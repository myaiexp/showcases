// The corners of a tilted rectangle and the box that bounds a triangle
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
  height = 300
}

forall Thing t {
  t.turn = random(15, 75)
  t.pts = [(60, -50), (170, -80), (110, 70)]
  t.corners = rectPts(t.r)
  t.r = Rectangle {
    center : (-110, 0)
    width : 120
    height : 60
    rotation : t.turn
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.p = Polygon {
    points : t.pts
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.k0 = Circle {
    center : t.corners[0]
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.k1 = Circle {
    center : t.corners[1]
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.k2 = Circle {
    center : t.corners[2]
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.k3 = Circle {
    center : t.corners[3]
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.boxR = Polygon {
    points : bboxPts(t.r)
    fillColor : none()
    strokeColor : #c0392b
    strokeWidth : 2
    strokeStyle : "dashed"
  }
  t.boxP = Polygon {
    points : bboxPts(t.p)
    fillColor : none()
    strokeColor : #c0392b
    strokeWidth : 2
    strokeStyle : "dashed"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
