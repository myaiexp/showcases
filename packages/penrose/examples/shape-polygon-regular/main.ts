// Triangle, pentagon and hexagon as Polygon point lists of equal radius
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: '3 points',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx + 0.0, t.dy + 48.0), (t.dx + -41.6, t.dy + -24.0), (t.dx + 41.6, t.dy + -24.0)]
    fillColor : rgba(0.3, 0.6, 0.8, 0.85)
    strokeColor : #123a66
    strokeWidth : 3
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 70
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 140
}
`,
      },
      {
        label: '5 points',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx + 0.0, t.dy + 48.0), (t.dx + -45.7, t.dy + 14.8), (t.dx + -28.2, t.dy + -38.8), (t.dx + 28.2, t.dy + -38.8), (t.dx + 45.7, t.dy + 14.8)]
    fillColor : rgba(0.3, 0.6, 0.8, 0.85)
    strokeColor : #123a66
    strokeWidth : 3
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 70
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 140
}
`,
      },
      {
        label: '6 points',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx + 0.0, t.dy + 48.0), (t.dx + -41.6, t.dy + 24.0), (t.dx + -41.6, t.dy + -24.0), (t.dx + -0.0, t.dy + -48.0), (t.dx + 41.6, t.dy + -24.0), (t.dx + 41.6, t.dy + 24.0)]
    fillColor : rgba(0.3, 0.6, 0.8, 0.85)
    strokeColor : #123a66
    strokeWidth : 3
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 70
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 140
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
