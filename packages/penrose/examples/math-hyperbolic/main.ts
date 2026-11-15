// Hyperbolic functions evaluated along a stretched axis
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
  t.k = random(0.6, 1.3)
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
  t.cosh = Path {
    d : pathFromPoints("open", [(-120 * t.k, cosh(-2) * 30 - 40), (-105 * t.k, cosh(-1.75) * 30 - 40), (-90 * t.k, cosh(-1.5) * 30 - 40), (-75 * t.k, cosh(-1.25) * 30 - 40), (-60 * t.k, cosh(-1) * 30 - 40), (-45 * t.k, cosh(-0.75) * 30 - 40), (-30 * t.k, cosh(-0.5) * 30 - 40), (-15 * t.k, cosh(-0.25) * 30 - 40), (0 * t.k, cosh(0) * 30 - 40), (15 * t.k, cosh(0.25) * 30 - 40), (30 * t.k, cosh(0.5) * 30 - 40), (45 * t.k, cosh(0.75) * 30 - 40), (60 * t.k, cosh(1) * 30 - 40), (75 * t.k, cosh(1.25) * 30 - 40), (90 * t.k, cosh(1.5) * 30 - 40), (105 * t.k, cosh(1.75) * 30 - 40), (120 * t.k, cosh(2) * 30 - 40)])
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.sinh = Path {
    d : pathFromPoints("open", [(-120 * t.k, sinh(-2) * 30), (-105 * t.k, sinh(-1.75) * 30), (-90 * t.k, sinh(-1.5) * 30), (-75 * t.k, sinh(-1.25) * 30), (-60 * t.k, sinh(-1) * 30), (-45 * t.k, sinh(-0.75) * 30), (-30 * t.k, sinh(-0.5) * 30), (-15 * t.k, sinh(-0.25) * 30), (0 * t.k, sinh(0) * 30), (15 * t.k, sinh(0.25) * 30), (30 * t.k, sinh(0.5) * 30), (45 * t.k, sinh(0.75) * 30), (60 * t.k, sinh(1) * 30), (75 * t.k, sinh(1.25) * 30), (90 * t.k, sinh(1.5) * 30), (105 * t.k, sinh(1.75) * 30), (120 * t.k, sinh(2) * 30)])
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.tanh = Path {
    d : pathFromPoints("open", [(-120 * t.k, tanh(-2) * 60), (-105 * t.k, tanh(-1.75) * 60), (-90 * t.k, tanh(-1.5) * 60), (-75 * t.k, tanh(-1.25) * 60), (-60 * t.k, tanh(-1) * 60), (-45 * t.k, tanh(-0.75) * 60), (-30 * t.k, tanh(-0.5) * 60), (-15 * t.k, tanh(-0.25) * 60), (0 * t.k, tanh(0) * 60), (15 * t.k, tanh(0.25) * 60), (30 * t.k, tanh(0.5) * 60), (45 * t.k, tanh(0.75) * 60), (60 * t.k, tanh(1) * 60), (75 * t.k, tanh(1.25) * 60), (90 * t.k, tanh(1.5) * 60), (105 * t.k, tanh(1.75) * 60), (120 * t.k, tanh(2) * 60)])
    strokeColor : #2e8b57
    strokeWidth : 4
    fillColor : none()
  }
  t.l1 = Text {
    string : "cosh"
    center : (-150, 112)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "sinh"
    center : (-150, -112)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l3 = Text {
    string : "tanh"
    center : (150, 76)
    fontSize : "18px"
    fillColor : #2e8b57
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
