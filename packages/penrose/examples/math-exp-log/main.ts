// Exp(k x) and log(x) / k mirrored over the diagonal
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
  height = 400
}

forall Thing t {
  t.k = random(0.6, 1.4)
  t.xAxis = Line {
    start : (-190, 0)
    end : (190, 0)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.yAxis = Line {
    start : (0, -190)
    end : (0, 190)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.diag = Line {
    start : (-150, -150)
    end : (150, 150)
    strokeWidth : 2
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.exp = Path {
    d : pathFromPoints("open", [(-96, exp(-1.6 * t.k) * 60 - 60), (-86.4, exp(-1.44 * t.k) * 60 - 60), (-76.8, exp(-1.28 * t.k) * 60 - 60), (-67.2, exp(-1.12 * t.k) * 60 - 60), (-57.6, exp(-0.96 * t.k) * 60 - 60), (-48, exp(-0.8 * t.k) * 60 - 60), (-38.4, exp(-0.64 * t.k) * 60 - 60), (-28.8, exp(-0.48 * t.k) * 60 - 60), (-19.2, exp(-0.32 * t.k) * 60 - 60), (-9.6, exp(-0.16 * t.k) * 60 - 60), (0, exp(0 * t.k) * 60 - 60), (9.6, exp(0.16 * t.k) * 60 - 60), (19.2, exp(0.32 * t.k) * 60 - 60), (28.8, exp(0.48 * t.k) * 60 - 60), (38.4, exp(0.64 * t.k) * 60 - 60), (48, exp(0.8 * t.k) * 60 - 60), (57.6, exp(0.96 * t.k) * 60 - 60), (67.2, exp(1.12 * t.k) * 60 - 60), (76.8, exp(1.28 * t.k) * 60 - 60), (86.4, exp(1.44 * t.k) * 60 - 60), (96, exp(1.6 * t.k) * 60 - 60)])
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.log = Path {
    d : pathFromPoints("open", [(-54, log(0.1) / t.k * 60), (-44.4, log(0.26) / t.k * 60), (-34.8, log(0.42) / t.k * 60), (-25.2, log(0.58) / t.k * 60), (-15.6, log(0.74) / t.k * 60), (-6, log(0.9) / t.k * 60), (3.6, log(1.06) / t.k * 60), (13.2, log(1.22) / t.k * 60), (22.8, log(1.38) / t.k * 60), (32.4, log(1.54) / t.k * 60), (42, log(1.7) / t.k * 60), (51.6, log(1.86) / t.k * 60), (61.2, log(2.02) / t.k * 60), (70.8, log(2.18) / t.k * 60), (80.4, log(2.34) / t.k * 60), (90, log(2.5) / t.k * 60), (99.6, log(2.66) / t.k * 60), (109.2, log(2.82) / t.k * 60), (118.8, log(2.98) / t.k * 60), (128.4, log(3.14) / t.k * 60), (138, log(3.3) / t.k * 60)])
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.l1 = Text {
    string : "exp"
    center : (70, 140)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "log"
    center : (150, -30)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
