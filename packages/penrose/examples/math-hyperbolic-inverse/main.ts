// Inverse hyperbolic functions mirror the hyperbolic ones
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
  t.k = random(0.6, 1.2)
  t.xAxis = Line {
    start : (-190, 0)
    end : (190, 0)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.yAxis = Line {
    start : (0, -140)
    end : (0, 140)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.asinh = Path {
    d : pathFromPoints("open", [(-150, asinh(-3) * 50 * t.k), (-131.25, asinh(-2.62) * 50 * t.k), (-112.5, asinh(-2.25) * 50 * t.k), (-93.75, asinh(-1.87) * 50 * t.k), (-75, asinh(-1.5) * 50 * t.k), (-56.25, asinh(-1.12) * 50 * t.k), (-37.5, asinh(-0.75) * 50 * t.k), (-18.75, asinh(-0.37) * 50 * t.k), (0, asinh(0) * 50 * t.k), (18.75, asinh(0.38) * 50 * t.k), (37.5, asinh(0.75) * 50 * t.k), (56.25, asinh(1.13) * 50 * t.k), (75, asinh(1.5) * 50 * t.k), (93.75, asinh(1.88) * 50 * t.k), (112.5, asinh(2.25) * 50 * t.k), (131.25, asinh(2.63) * 50 * t.k), (150, asinh(3) * 50 * t.k)])
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.acosh = Path {
    d : pathFromPoints("open", [(50, acosh(1) * 50 * t.k), (65, acosh(1.3) * 50 * t.k), (80, acosh(1.6) * 50 * t.k), (95, acosh(1.9) * 50 * t.k), (110, acosh(2.2) * 50 * t.k), (125, acosh(2.5) * 50 * t.k), (140, acosh(2.8) * 50 * t.k), (155, acosh(3.1) * 50 * t.k), (170, acosh(3.4) * 50 * t.k), (185, acosh(3.7) * 50 * t.k), (200, acosh(4) * 50 * t.k), (215, acosh(4.3) * 50 * t.k)])
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.atanh = Path {
    d : pathFromPoints("open", [(-84, atanh(-0.84) * 40 * t.k), (-72, atanh(-0.72) * 40 * t.k), (-60, atanh(-0.6) * 40 * t.k), (-48, atanh(-0.48) * 40 * t.k), (-36, atanh(-0.36) * 40 * t.k), (-24, atanh(-0.24) * 40 * t.k), (-12, atanh(-0.12) * 40 * t.k), (0, atanh(0) * 40 * t.k), (12, atanh(0.12) * 40 * t.k), (24, atanh(0.24) * 40 * t.k), (36, atanh(0.36) * 40 * t.k), (48, atanh(0.48) * 40 * t.k), (60, atanh(0.6) * 40 * t.k), (72, atanh(0.72) * 40 * t.k), (84, atanh(0.84) * 40 * t.k)])
    strokeColor : #2e8b57
    strokeWidth : 4
    fillColor : none()
  }
  t.l1 = Text {
    string : "asinh"
    center : (-140, -100)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l2 = Text {
    string : "acosh"
    center : (150, 100)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l3 = Text {
    string : "atanh"
    center : (-40, 120)
    fontSize : "18px"
    fillColor : #2e8b57
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
