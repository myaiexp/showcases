// A circle around each query point reaches exactly to the shape
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
    fillColor : #dddddd88
    strokeColor : #555555
    strokeWidth : 3
  }
  t.r = Rectangle {
    center : (0, 0)
    width : 70
    height : 56
    rotation : 0
    fillColor : #dddddd88
    strokeColor : #555555
    strokeWidth : 3
  }
  t.p = Polygon {
    points : [(120, -35), (200, -25), (160, 35)]
    fillColor : #dddddd88
    strokeColor : #555555
    strokeWidth : 3
  }
  t.qc = (-160, 0) + random(10, 80) * unitVector(random(0, 6.28))
  t.qr = (0, 0) + random(10, 80) * unitVector(random(0, 6.28))
  t.qp = (160, 0) + random(10, 80) * unitVector(random(0, 6.28))
  t.ringc = Circle {
    center : t.qc
    r : abs(signedDistance(t.c, t.qc)) + 0.5
    fillColor : none()
    strokeColor : rgba(0.5 - 0.4 * sign(signedDistance(t.c, t.qc)), 0.35, 0.5 + 0.4 * sign(signedDistance(t.c, t.qc)), 1)
    strokeWidth : 3
    ensureOnCanvas : false
  }
  t.qcDot = Circle {
    center : t.qc
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.ringr = Circle {
    center : t.qr
    r : abs(signedDistance(t.r, t.qr)) + 0.5
    fillColor : none()
    strokeColor : rgba(0.5 - 0.4 * sign(signedDistance(t.r, t.qr)), 0.35, 0.5 + 0.4 * sign(signedDistance(t.r, t.qr)), 1)
    strokeWidth : 3
    ensureOnCanvas : false
  }
  t.qrDot = Circle {
    center : t.qr
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.ringp = Circle {
    center : t.qp
    r : abs(signedDistance(t.p, t.qp)) + 0.5
    fillColor : none()
    strokeColor : rgba(0.5 - 0.4 * sign(signedDistance(t.p, t.qp)), 0.35, 0.5 + 0.4 * sign(signedDistance(t.p, t.qp)), 1)
    strokeWidth : 3
    ensureOnCanvas : false
  }
  t.qpDot = Circle {
    center : t.qp
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
