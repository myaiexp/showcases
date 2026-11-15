// Logarithm bases and the small-argument variants
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
  t.k = random(0.7, 1.3)
  t.xAxis = Line {
    start : (-190, 0)
    end : (190, 0)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.yAxis = Line {
    start : (-170, -140)
    end : (-170, 140)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.log2 = Path {
    d : pathFromPoints("open", [(-157.5, log2(0.25) * 30 * t.k), (-132.5, log2(0.75) * 30 * t.k), (-107.5, log2(1.25) * 30 * t.k), (-82.5, log2(1.75) * 30 * t.k), (-57.5, log2(2.25) * 30 * t.k), (-32.5, log2(2.75) * 30 * t.k), (-7.5, log2(3.25) * 30 * t.k), (17.5, log2(3.75) * 30 * t.k), (42.5, log2(4.25) * 30 * t.k), (67.5, log2(4.75) * 30 * t.k), (92.5, log2(5.25) * 30 * t.k), (117.5, log2(5.75) * 30 * t.k), (142.5, log2(6.25) * 30 * t.k), (167.5, log2(6.75) * 30 * t.k)])
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.log10 = Path {
    d : pathFromPoints("open", [(-157.5, log10(0.25) * 30 * t.k), (-132.5, log10(0.75) * 30 * t.k), (-107.5, log10(1.25) * 30 * t.k), (-82.5, log10(1.75) * 30 * t.k), (-57.5, log10(2.25) * 30 * t.k), (-32.5, log10(2.75) * 30 * t.k), (-7.5, log10(3.25) * 30 * t.k), (17.5, log10(3.75) * 30 * t.k), (42.5, log10(4.25) * 30 * t.k), (67.5, log10(4.75) * 30 * t.k), (92.5, log10(5.25) * 30 * t.k), (117.5, log10(5.75) * 30 * t.k), (142.5, log10(6.25) * 30 * t.k), (167.5, log10(6.75) * 30 * t.k)])
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.log1p = Path {
    d : pathFromPoints("open", [(-170, log1p(0) * 30 * t.k), (-145, log1p(0.5) * 30 * t.k), (-120, log1p(1) * 30 * t.k), (-95, log1p(1.5) * 30 * t.k), (-70, log1p(2) * 30 * t.k), (-45, log1p(2.5) * 30 * t.k), (-20, log1p(3) * 30 * t.k), (5, log1p(3.5) * 30 * t.k), (30, log1p(4) * 30 * t.k), (55, log1p(4.5) * 30 * t.k), (80, log1p(5) * 30 * t.k), (105, log1p(5.5) * 30 * t.k), (130, log1p(6) * 30 * t.k), (155, log1p(6.5) * 30 * t.k)])
    strokeColor : #2e8b57
    strokeWidth : 4
    fillColor : none()
  }
  t.expm1 = Path {
    d : pathFromPoints("open", [(-170, expm1(0) * 30 * t.k), (-157.5, expm1(0.25) * 30 * t.k), (-145, expm1(0.5) * 30 * t.k), (-132.5, expm1(0.75) * 30 * t.k), (-120, expm1(1) * 30 * t.k), (-107.5, expm1(1.25) * 30 * t.k), (-95, expm1(1.5) * 30 * t.k), (-82.5, expm1(1.75) * 30 * t.k), (-70, expm1(2) * 30 * t.k), (-57.5, expm1(2.25) * 30 * t.k)])
    strokeColor : #e08a1e
    strokeWidth : 4
    fillColor : none()
  }
  t.l1 = Text {
    string : "log2"
    center : (150, 70)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "log10"
    center : (150, 12)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l3 = Text {
    string : "log1p"
    center : (150, 40)
    fontSize : "18px"
    fillColor : #2e8b57
  }
  t.l4 = Text {
    string : "expm1"
    center : (-30, 112)
    fontSize : "18px"
    fillColor : #e08a1e
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
