// Path d from pathFromPoints, open and closed, with a fill on the closed one
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: '"open"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.path = Path {
    d : pathFromPoints("open", [(t.dx - 60, t.dy - 40), (t.dx - 20, t.dy + 45), (t.dx + 30, t.dy - 10), (t.dx + 65, t.dy + 40)])
    strokeWidth : 4
    strokeColor : #7a3a00
  }
  ensure abs(t.dx) < 110
  ensure abs(t.dy) < 85
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 160
}
`,
      },
      {
        label: '"closed"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.path = Path {
    d : pathFromPoints("closed", [(t.dx - 60, t.dy - 40), (t.dx - 20, t.dy + 45), (t.dx + 30, t.dy - 10), (t.dx + 65, t.dy + 40)])
    strokeWidth : 4
    strokeColor : #7a3a00
  }
  ensure abs(t.dx) < 110
  ensure abs(t.dy) < 85
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 160
}
`,
      },
      {
        label: '"closed" and filled',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.path = Path {
    d : pathFromPoints("closed", [(t.dx - 60, t.dy - 40), (t.dx - 20, t.dy + 45), (t.dx + 30, t.dy - 10), (t.dx + 65, t.dy + 40)])
    strokeWidth : 4
    strokeColor : #7a3a00
    fillColor : rgba(0.95, 0.75, 0.3, 0.85)
  }
  ensure abs(t.dx) < 110
  ensure abs(t.dy) < 85
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 160
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
