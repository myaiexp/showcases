// The nearest point on the visible outline of a shape from a sampled viewpoint
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
  t.c = Circle {
    center : (-160, 0)
    r : 38
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.r = Rectangle {
    center : (0, 0)
    width : 70
    height : 56
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.p = Polygon {
    points : [(120, -35), (200, -25), (160, 35)]
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.qc = (-160, 0) + random(85, 110) * unitVector(random(0, 6.28))
  t.qr = (0, 0) + random(85, 110) * unitVector(random(0, 6.28))
  t.qp = (160, 0) + random(85, 110) * unitVector(random(0, 6.28))
  t.ringc = Circle {
    center : t.qc
    r : closestSilhouetteDistance(t.c, t.qc)
    fillColor : none()
    strokeColor : #c0392b88
    strokeWidth : 2
    strokeStyle : "dashed"
    ensureOnCanvas : false
  }
  t.lnc = Line {
    start : t.qc
    end : closestSilhouettePoint(t.c, t.qc)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.qcDot = Circle {
    center : t.qc
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitc = Circle {
    center : closestSilhouettePoint(t.c, t.qc)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.ringr = Circle {
    center : t.qr
    r : closestSilhouetteDistance(t.r, t.qr)
    fillColor : none()
    strokeColor : #c0392b88
    strokeWidth : 2
    strokeStyle : "dashed"
    ensureOnCanvas : false
  }
  t.lnr = Line {
    start : t.qr
    end : closestSilhouettePoint(t.r, t.qr)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.qrDot = Circle {
    center : t.qr
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitr = Circle {
    center : closestSilhouettePoint(t.r, t.qr)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.ringp = Circle {
    center : t.qp
    r : closestSilhouetteDistance(t.p, t.qp)
    fillColor : none()
    strokeColor : #c0392b88
    strokeWidth : 2
    strokeStyle : "dashed"
    ensureOnCanvas : false
  }
  t.lnp = Line {
    start : t.qp
    end : closestSilhouettePoint(t.p, t.qp)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.qpDot = Circle {
    center : t.qp
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitp = Circle {
    center : closestSilhouettePoint(t.p, t.qp)
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
