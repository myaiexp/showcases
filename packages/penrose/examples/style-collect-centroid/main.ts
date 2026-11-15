// Vector fields collect into a matrix that sumVectors turns into a mean
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Point
predicate Red(Point)
`,
    substance: `Point P, Q, R, S, T
Red(P)
Red(Q)
NoLabel P, Q, R, S, T
`,
    style: `canvas {
  width = 600
  height = 400
}

forall Point p {
  p.pos = (?, ?)
  p.icon = Circle {
    center : p.pos
    r : 14
    strokeWidth : 0.0
    fillColor : rgba(0.35, 0.4, 0.55, 1.0)
  }
}

forall Point p
where Red(p) {
  override p.icon.fillColor = rgba(0.9, 0.3, 0.25, 1.0)
}

forall Point a; Point b {
  ensure disjoint(a.icon, b.icon, 30.0)
}

-- centroid of every point
collect Point p into ps {
  centre = sumVectors(listof pos from ps) / numberof ps
  all = Circle {
    center : centre
    r : 24
    fillColor : none()
    strokeColor : rgba(0.15, 0.15, 0.15, 1.0)
    strokeWidth : 4.0
  }
}

-- centroid of the red points only
collect Point p into reds
where Red(p) {
  centre = sumVectors(listof pos from reds) / numberof reds
  red = Circle {
    center : centre
    r : 36
    fillColor : none()
    strokeColor : rgba(0.9, 0.3, 0.25, 1.0)
    strokeWidth : 4.0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
