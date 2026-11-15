// interpolateQuadraticFromPoints draws a curve through its middle point
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
  t.p0 = (-150, -60)
  t.p2 = (150, -60)
  t.mid = Circle {
    r : 7
    fillColor : #c0392b
    center : (?, ?)
  }
  ensure t.mid.center[1] > 20
  ensure t.mid.center[1] < 110
  ensure abs(t.mid.center[0]) < 120
  t.curve = Path {
    d : interpolateQuadraticFromPoints("open", t.p0, t.mid.center, t.p2)
    strokeWidth : 4
    strokeColor : #333333
  }
  t.ends = Circle {
    center : t.p0
    r : 5
    fillColor : #333333
  }
  t.ends2 = Circle {
    center : t.p2
    r : 5
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
