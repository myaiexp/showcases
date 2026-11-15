// A Polyline whose points are the centres of moving circles
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
predicate Before(Dot a, Dot b)
`,
    substance: `Dot A, B, C, D
Before(A, B)
Before(B, C)
Before(C, D)
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dot = Circle {
    r : 11
    fillColor : #c0392b
  }
}

forall Dot a; Dot b
where Before(a, b) {
  ensure a.dot.center[0] + 60 < b.dot.center[0]
}

forall Dot a; Dot b; Dot c; Dot d
where Before(a, b); Before(b, c); Before(c, d) {
  trail = Polyline {
    points : [a.dot.center, b.dot.center, c.dot.center, d.dot.center]
    strokeWidth : 4
    strokeColor : #555555
  }
  trail below a.dot
  trail below b.dot
  trail below c.dot
  trail below d.dot
}
`,
  });
  return () => stage.dispose();
};

export default mount;
