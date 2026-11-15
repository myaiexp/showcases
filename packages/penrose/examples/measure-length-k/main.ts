// Five free points between pinned ends, pulled by powers of segment lengths
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
  t.y2 = ?
  t.y3 = ?
  t.y4 = ?
  t.y5 = ?
  ensure abs(t.y1) < 100
  ensure abs(t.y2) < 100
  ensure abs(t.y3) < 100
  ensure abs(t.y4) < 100
  ensure abs(t.y5) < 100
  t.x1 = ?
  t.x2 = ?
  t.x3 = ?
  t.x4 = ?
  t.x5 = ?
  ensure t.x1 > -150
  ensure t.x1 < t.x2
  ensure t.x2 < t.x3
  ensure t.x3 < t.x4
  ensure t.x4 < t.x5
  ensure t.x5 < 150
  t.pts = [(-160, -50), (t.x1, t.y1), (t.x2, t.y2), (t.x3, t.y3), (t.x4, t.y4), (t.x5, t.y5), (160, 50)]
  t.path = Polyline {
    points : t.pts
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.d1 = Circle {
    center : (t.x1, t.y1)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : (t.x2, t.y2)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : (t.x3, t.y3)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : (t.x4, t.y4)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : (t.x5, t.y5)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.e0 = Circle {
    center : (-160, -50)
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.e1 = Circle {
    center : (160, 50)
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'no objective',
      },
      {
        label: 'minimal(lengthK(…, 1))',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.y1 = ?
  t.y2 = ?
  t.y3 = ?
  t.y4 = ?
  t.y5 = ?
  ensure abs(t.y1) < 100
  ensure abs(t.y2) < 100
  ensure abs(t.y3) < 100
  ensure abs(t.y4) < 100
  ensure abs(t.y5) < 100
  t.x1 = ?
  t.x2 = ?
  t.x3 = ?
  t.x4 = ?
  t.x5 = ?
  ensure t.x1 > -150
  ensure t.x1 < t.x2
  ensure t.x2 < t.x3
  ensure t.x3 < t.x4
  ensure t.x4 < t.x5
  ensure t.x5 < 150
  t.pts = [(-160, -50), (t.x1, t.y1), (t.x2, t.y2), (t.x3, t.y3), (t.x4, t.y4), (t.x5, t.y5), (160, 50)]
  encourage minimal(lengthK(t.pts, false, 1))
  t.path = Polyline {
    points : t.pts
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.d1 = Circle {
    center : (t.x1, t.y1)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : (t.x2, t.y2)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : (t.x3, t.y3)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : (t.x4, t.y4)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : (t.x5, t.y5)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.e0 = Circle {
    center : (-160, -50)
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.e1 = Circle {
    center : (160, 50)
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'minimal(lengthK(…, 2))',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.y1 = ?
  t.y2 = ?
  t.y3 = ?
  t.y4 = ?
  t.y5 = ?
  ensure abs(t.y1) < 100
  ensure abs(t.y2) < 100
  ensure abs(t.y3) < 100
  ensure abs(t.y4) < 100
  ensure abs(t.y5) < 100
  t.x1 = ?
  t.x2 = ?
  t.x3 = ?
  t.x4 = ?
  t.x5 = ?
  ensure t.x1 > -150
  ensure t.x1 < t.x2
  ensure t.x2 < t.x3
  ensure t.x3 < t.x4
  ensure t.x4 < t.x5
  ensure t.x5 < 150
  t.pts = [(-160, -50), (t.x1, t.y1), (t.x2, t.y2), (t.x3, t.y3), (t.x4, t.y4), (t.x5, t.y5), (160, 50)]
  encourage minimal(lengthK(t.pts, false, 2))
  t.path = Polyline {
    points : t.pts
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : none()
  }
  t.d1 = Circle {
    center : (t.x1, t.y1)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : (t.x2, t.y2)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : (t.x3, t.y3)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : (t.x4, t.y4)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : (t.x5, t.y5)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.e0 = Circle {
    center : (-160, -50)
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.e1 = Circle {
    center : (160, 50)
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
