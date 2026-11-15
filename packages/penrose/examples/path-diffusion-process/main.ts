// Forty points of a noisy path with a sampled drift
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
  t.start = (-120, 0)
  t.omega = random(0.8, 1.8) * unitVector(random(-0.7, 0.7))
  t.walk = diffusionProcess(40, t.start, [[3, 0], [0, 3]], t.omega)
  t.line = Polyline {
    points : t.walk
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.s = Circle {
    center : t.start
    r : 7
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.e = Circle {
    center : lastPoint(t.walk)
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.drift = Line {
    start : (-120, -120)
    end : (-120, -120) + 40 * t.omega
    strokeWidth : 4
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.l = Text {
    string : "omega"
    center : (-120, -140)
    fontSize : "18px"
    fillColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
