// An open Polyline with and without a fillColor
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'No fill (default)',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.line = Polyline {
    points : [(t.dx - 55, t.dy - 40), (t.dx - 55, t.dy + 40), (t.dx + 55, t.dy + 40), (t.dx + 20, t.dy - 40)]
    strokeWidth : 4
    strokeColor : #7a3a00
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 90
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 150
}
`,
      },
      {
        label: 'fillColor',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.line = Polyline {
    points : [(t.dx - 55, t.dy - 40), (t.dx - 55, t.dy + 40), (t.dx + 55, t.dy + 40), (t.dx + 20, t.dy - 40)]
    strokeWidth : 4
    strokeColor : #7a3a00
    fillColor : rgba(0.95, 0.6, 0.3, 0.8)
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 90
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 150
}
`,
      },
      {
        label: 'Fill and dashes',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.line = Polyline {
    points : [(t.dx - 55, t.dy - 40), (t.dx - 55, t.dy + 40), (t.dx + 55, t.dy + 40), (t.dx + 20, t.dy - 40)]
    strokeWidth : 4
    strokeColor : #7a3a00
    fillColor : rgba(0.95, 0.6, 0.3, 0.8)
    strokeDasharray : "9 5"
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 90
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 150
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
