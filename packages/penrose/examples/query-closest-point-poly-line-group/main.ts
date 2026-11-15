// The same query on shapes with corners and on a group of shapes
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
  t.p = Polygon {
    points : [(-195, -30), (-120, -40), (-155, 35)]
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.pl = Polyline {
    points : [(-35, -40), (0, 30), (40, -35), (70, 20)]
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.gc = Circle {
    center : (130, 30)
    r : 22
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.gr = Rectangle {
    center : (160, -30)
    width : 46
    height : 36
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.g = Group {
    shapes : [t.gc, t.gr]
  }
  t.qp = (-155, 0) + random(72, 88) * unitVector(random(0, 6.28))
  t.qpl = (15, -5) + random(70, 85) * unitVector(random(0, 6.28))
  t.qg = (145, 0) + random(65, 80) * unitVector(random(0, 6.28))
  t.lnp = Line {
    start : t.qp
    end : closestPoint(t.p, t.qp)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.qpDot = Circle {
    center : t.qp
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitp = Circle {
    center : closestPoint(t.p, t.qp)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.lnpl = Line {
    start : t.qpl
    end : closestPoint(t.pl, t.qpl)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.qplDot = Circle {
    center : t.qpl
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitpl = Circle {
    center : closestPoint(t.pl, t.qpl)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.lng = Line {
    start : t.qg
    end : closestPoint(t.g, t.qg)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.qgDot = Circle {
    center : t.qg
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitg = Circle {
    center : closestPoint(t.g, t.qg)
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
