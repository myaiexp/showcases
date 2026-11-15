// The nearest point of three shapes to a sampled query point
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
    r : 42
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.r = Rectangle {
    center : (0, 0)
    width : 76
    height : 54
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.e = Ellipse {
    center : (160, 0)
    rx : 50
    ry : 30
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.qc = (-160, 0) + random(62, 76) * unitVector(random(0, 6.28))
  t.qr = (0, 0) + random(62, 76) * unitVector(random(0, 6.28))
  t.qe = (160, 0) + random(62, 76) * unitVector(random(0, 6.28))
  t.lnc = Line {
    start : t.qc
    end : closestPoint(t.c, t.qc)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.qcDot = Circle {
    center : t.qc
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitc = Circle {
    center : closestPoint(t.c, t.qc)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.lnr = Line {
    start : t.qr
    end : closestPoint(t.r, t.qr)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.qrDot = Circle {
    center : t.qr
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hitr = Circle {
    center : closestPoint(t.r, t.qr)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.lne = Line {
    start : t.qe
    end : closestPoint(t.e, t.qe)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.qeDot = Circle {
    center : t.qe
    r : 6
    fillColor : #777777
    strokeWidth : 0
  }
  t.hite = Circle {
    center : closestPoint(t.e, t.qe)
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
