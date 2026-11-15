// A quadratic curve with padded ends between sampled points
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
  t.A = (random(-150, -90), random(-60, 60))
  t.B = (random(90, 150), random(-60, 60))
  t.h = random(-70, 70)
  t.ringA = Circle {
    center : t.A
    r : 14
    fillColor : none()
    strokeColor : #555555
    strokeWidth : 2
  }
  t.ringB = Circle {
    center : t.B
    r : 14
    fillColor : none()
    strokeColor : #555555
    strokeWidth : 2
  }
  t.a = Circle {
    center : t.A
    r : 4
    fillColor : #555555
    strokeWidth : 0
  }
  t.b = Circle {
    center : t.B
    r : 4
    fillColor : #555555
    strokeWidth : 0
  }
  t.curve = Path {
    d : makePath(t.A, t.B, t.h, 14)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
    endArrowhead : "straight"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
