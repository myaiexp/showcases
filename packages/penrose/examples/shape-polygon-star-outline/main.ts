// A concave star Polygon with solid, dashed and dotted outlines
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'solid',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx + 0.0, t.dy + 52.0), (t.dx + -12.9, t.dy + 17.8), (t.dx + -49.5, t.dy + 16.1), (t.dx + -20.9, t.dy + -6.8), (t.dx + -30.6, t.dy + -42.1), (t.dx + -0.0, t.dy + -22.0), (t.dx + 30.6, t.dy + -42.1), (t.dx + 20.9, t.dy + -6.8), (t.dx + 49.5, t.dy + 16.1), (t.dx + 12.9, t.dy + 17.8)]
    fillColor : rgba(0.98, 0.85, 0.35, 0.9)
    strokeColor : #7a5a00
    strokeWidth : 4
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
        label: 'dashed',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx + 0.0, t.dy + 52.0), (t.dx + -12.9, t.dy + 17.8), (t.dx + -49.5, t.dy + 16.1), (t.dx + -20.9, t.dy + -6.8), (t.dx + -30.6, t.dy + -42.1), (t.dx + -0.0, t.dy + -22.0), (t.dx + 30.6, t.dy + -42.1), (t.dx + 20.9, t.dy + -6.8), (t.dx + 49.5, t.dy + 16.1), (t.dx + 12.9, t.dy + 17.8)]
    fillColor : rgba(0.98, 0.85, 0.35, 0.9)
    strokeColor : #7a5a00
    strokeWidth : 4
    strokeStyle : "dashed"
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
        label: 'dotted',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx + 0.0, t.dy + 52.0), (t.dx + -12.9, t.dy + 17.8), (t.dx + -49.5, t.dy + 16.1), (t.dx + -20.9, t.dy + -6.8), (t.dx + -30.6, t.dy + -42.1), (t.dx + -0.0, t.dy + -22.0), (t.dx + 30.6, t.dy + -42.1), (t.dx + 20.9, t.dy + -6.8), (t.dx + 49.5, t.dy + 16.1), (t.dx + 12.9, t.dy + 17.8)]
    fillColor : rgba(0.98, 0.85, 0.35, 0.9)
    strokeColor : #7a5a00
    strokeWidth : 4
    strokeDasharray : "1 7"
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
