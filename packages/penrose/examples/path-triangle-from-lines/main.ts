// Three sampled edges closed into one fillable path
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
  t.A = (random(-150, -60), random(-90, -30))
  t.B = (random(60, 150), random(-90, -30))
  t.C = (random(-60, 60), random(30, 100))
  t.l1 = Line {
    start : t.A
    end : t.B
    strokeWidth : 3
    strokeColor : #2f6fbf
  }
  t.l2 = Line {
    start : t.B
    end : t.C
    strokeWidth : 3
    strokeColor : #2f6fbf
  }
  t.l3 = Line {
    start : t.C
    end : t.A
    strokeWidth : 3
    strokeColor : #2f6fbf
  }
  t.fill = Path {
    d : triangle(t.l1, t.l2, t.l3)
    fillColor : #e08a1e77
    strokeWidth : 0
    strokeColor : none()
  }
  layer t.fill below t.l1
  t.a = Circle {
    center : t.A
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.b = Circle {
    center : t.B
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.c = Circle {
    center : t.C
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
