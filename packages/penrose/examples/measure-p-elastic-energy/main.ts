// The same pinned curve relaxed with curvature raised to 1, 2 and 4
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
  t.y1 = ?
  ensure abs(t.y1) < 120
  t.y2 = ?
  ensure abs(t.y2) < 120
  t.y3 = ?
  ensure abs(t.y3) < 120
  t.y5 = ?
  ensure abs(t.y5) < 120
  t.y6 = ?
  ensure abs(t.y6) < 120
  t.y7 = ?
  ensure abs(t.y7) < 120
  t.pts = [(-160, -50), (-120, t.y1), (-80, t.y2), (-40, t.y3), (0, 60), (40, t.y5), (80, t.y6), (120, t.y7), (160, -20)]
  encourage minimal(pElasticEnergy(t.pts, false, 1))
  t.curve = Polyline {
    points : t.pts
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d6 = Circle {
    center : t.pts[6]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d7 = Circle {
    center : t.pts[7]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d8 = Circle {
    center : t.pts[8]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'p = 1',
      },
      {
        label: 'p = 2',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.y1 = ?
  ensure abs(t.y1) < 120
  t.y2 = ?
  ensure abs(t.y2) < 120
  t.y3 = ?
  ensure abs(t.y3) < 120
  t.y5 = ?
  ensure abs(t.y5) < 120
  t.y6 = ?
  ensure abs(t.y6) < 120
  t.y7 = ?
  ensure abs(t.y7) < 120
  t.pts = [(-160, -50), (-120, t.y1), (-80, t.y2), (-40, t.y3), (0, 60), (40, t.y5), (80, t.y6), (120, t.y7), (160, -20)]
  encourage minimal(pElasticEnergy(t.pts, false, 2))
  t.curve = Polyline {
    points : t.pts
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d6 = Circle {
    center : t.pts[6]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d7 = Circle {
    center : t.pts[7]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d8 = Circle {
    center : t.pts[8]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'p = 4',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.y1 = ?
  ensure abs(t.y1) < 120
  t.y2 = ?
  ensure abs(t.y2) < 120
  t.y3 = ?
  ensure abs(t.y3) < 120
  t.y5 = ?
  ensure abs(t.y5) < 120
  t.y6 = ?
  ensure abs(t.y6) < 120
  t.y7 = ?
  ensure abs(t.y7) < 120
  t.pts = [(-160, -50), (-120, t.y1), (-80, t.y2), (-40, t.y3), (0, 60), (40, t.y5), (80, t.y6), (120, t.y7), (160, -20)]
  encourage minimal(pElasticEnergy(t.pts, false, 4))
  t.curve = Polyline {
    points : t.pts
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d6 = Circle {
    center : t.pts[6]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d7 = Circle {
    center : t.pts[7]
    r : 4
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d8 = Circle {
    center : t.pts[8]
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
