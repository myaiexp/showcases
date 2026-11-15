// Three queries on a sampled list of points
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
  t.pts = [(-150, random(-100, 100)), (-90, random(-100, 100)), (-30, random(-100, 100)), (30, random(-100, 100)), (90, random(-100, 100)), (150, random(-100, 100))]
  t.line = Polyline {
    points : t.pts
    strokeColor : #999999
    strokeWidth : 3
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 4
    fillColor : #777777
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 4
    fillColor : #777777
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 4
    fillColor : #777777
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 4
    fillColor : #777777
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 4
    fillColor : #777777
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 4
    fillColor : #777777
    strokeWidth : 0
  }
  t.first = Circle {
    center : firstPoint(t.pts)
    r : 12
    fillColor : none()
    strokeColor : #2e8b57
    strokeWidth : 2
  }
  t.last = Circle {
    center : lastPoint(t.pts)
    r : 12
    fillColor : none()
    strokeColor : #c0392b
    strokeWidth : 2
  }
  t.avg = Circle {
    center : averagePoint(t.pts)
    r : 9
    fillColor : #2f6fbf
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
