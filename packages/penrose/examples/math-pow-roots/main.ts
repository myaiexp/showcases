// Power and root curves for a sampled exponent
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
  t.p = random(0.3, 2.2)
  t.xAxis = Line {
    start : (-170, -120)
    end : (170, -120)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.yAxis = Line {
    start : (-170, -120)
    end : (-170, 130)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.sqr = Path {
    d : pathFromPoints("open", [(-170, sqr(0) * 80 - 120), (-157.5, sqr(0.13) * 80 - 120), (-145, sqr(0.25) * 80 - 120), (-132.5, sqr(0.38) * 80 - 120), (-120, sqr(0.5) * 80 - 120), (-107.5, sqr(0.63) * 80 - 120), (-95, sqr(0.75) * 80 - 120), (-82.5, sqr(0.88) * 80 - 120), (-70, sqr(1) * 80 - 120), (-57.5, sqr(1.13) * 80 - 120), (-45, sqr(1.25) * 80 - 120), (-32.5, sqr(1.38) * 80 - 120), (-20, sqr(1.5) * 80 - 120)])
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.sqrt = Path {
    d : pathFromPoints("open", [(-170, sqrt(0) * 80 - 120), (-157.5, sqrt(0.13) * 80 - 120), (-145, sqrt(0.25) * 80 - 120), (-132.5, sqrt(0.38) * 80 - 120), (-120, sqrt(0.5) * 80 - 120), (-107.5, sqrt(0.63) * 80 - 120), (-95, sqrt(0.75) * 80 - 120), (-82.5, sqrt(0.88) * 80 - 120), (-70, sqrt(1) * 80 - 120), (-57.5, sqrt(1.13) * 80 - 120), (-45, sqrt(1.25) * 80 - 120), (-32.5, sqrt(1.38) * 80 - 120), (-20, sqrt(1.5) * 80 - 120)])
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.cbrt = Path {
    d : pathFromPoints("open", [(-170, cbrt(0) * 80 - 120), (-157.5, cbrt(0.13) * 80 - 120), (-145, cbrt(0.25) * 80 - 120), (-132.5, cbrt(0.38) * 80 - 120), (-120, cbrt(0.5) * 80 - 120), (-107.5, cbrt(0.63) * 80 - 120), (-95, cbrt(0.75) * 80 - 120), (-82.5, cbrt(0.88) * 80 - 120), (-70, cbrt(1) * 80 - 120), (-57.5, cbrt(1.13) * 80 - 120), (-45, cbrt(1.25) * 80 - 120), (-32.5, cbrt(1.38) * 80 - 120), (-20, cbrt(1.5) * 80 - 120)])
    strokeColor : #2e8b57
    strokeWidth : 3
    fillColor : none()
  }
  t.pow = Path {
    d : pathFromPoints("open", [(-170, pow(0, t.p) * 80 - 120), (-157.5, pow(0.13, t.p) * 80 - 120), (-145, pow(0.25, t.p) * 80 - 120), (-132.5, pow(0.38, t.p) * 80 - 120), (-120, pow(0.5, t.p) * 80 - 120), (-107.5, pow(0.63, t.p) * 80 - 120), (-95, pow(0.75, t.p) * 80 - 120), (-82.5, pow(0.88, t.p) * 80 - 120), (-70, pow(1, t.p) * 80 - 120), (-57.5, pow(1.13, t.p) * 80 - 120), (-45, pow(1.25, t.p) * 80 - 120), (-32.5, pow(1.38, t.p) * 80 - 120), (-20, pow(1.5, t.p) * 80 - 120)])
    strokeColor : #333333
    strokeWidth : 5
    fillColor : none()
  }
  t.l1 = Text {
    string : "sqr"
    center : (70, 100)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "sqrt"
    center : (70, 72)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l3 = Text {
    string : "cbrt"
    center : (70, 44)
    fontSize : "18px"
    fillColor : #2e8b57
  }
  t.l4 = Text {
    string : "pow(x, p)"
    center : (100, 16)
    fontSize : "18px"
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
