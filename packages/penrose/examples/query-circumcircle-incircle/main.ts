// The circle through the corners and the circle touching the sides
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
  width = 600
  height = 450
}

forall Thing t {
  t.A = (random(-130, -90), random(-100, -70))
  t.B = (random(90, 130), random(-100, -70))
  t.C = (random(-50, 50), random(40, 100))
  t.outer = Circle {
    center : circumcenter(t.A, t.B, t.C)
    r : circumradius(t.A, t.B, t.C)
    fillColor : none()
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.inner = Circle {
    center : incenter(t.A, t.B, t.C)
    r : inradius(t.A, t.B, t.C)
    fillColor : #2e8b5733
    strokeColor : #2e8b57
    strokeWidth : 3
  }
  t.tri = Polygon {
    points : [t.A, t.B, t.C]
    fillColor : none()
    strokeColor : #333333
    strokeWidth : 3
  }
  t.o = Circle {
    center : circumcenter(t.A, t.B, t.C)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.i = Circle {
    center : incenter(t.A, t.B, t.C)
    r : 5
    fillColor : #2e8b57
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
