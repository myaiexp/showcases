// Thick Polyline zigzag with butt, round and square line caps
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'strokeLinecap: "butt"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.line = Polyline {
    points : [(t.dx - 70, t.dy - 30), (t.dx - 35, t.dy + 30), (t.dx, t.dy - 30), (t.dx + 35, t.dy + 30), (t.dx + 70, t.dy - 30)]
    strokeWidth : 16
    strokeColor : #2a6f97
    strokeLinecap : "butt"
  }
  ensure abs(t.dx) < 110
  ensure abs(t.dy) < 90
}

forall Thing a; Thing b {
  ensure abs(a.dy - b.dy) > 120
}
`,
      },
      {
        label: 'strokeLinecap: "round"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.line = Polyline {
    points : [(t.dx - 70, t.dy - 30), (t.dx - 35, t.dy + 30), (t.dx, t.dy - 30), (t.dx + 35, t.dy + 30), (t.dx + 70, t.dy - 30)]
    strokeWidth : 16
    strokeColor : #2a6f97
    strokeLinecap : "round"
  }
  ensure abs(t.dx) < 110
  ensure abs(t.dy) < 90
}

forall Thing a; Thing b {
  ensure abs(a.dy - b.dy) > 120
}
`,
      },
      {
        label: 'strokeLinecap: "square"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.line = Polyline {
    points : [(t.dx - 70, t.dy - 30), (t.dx - 35, t.dy + 30), (t.dx, t.dy - 30), (t.dx + 35, t.dy + 30), (t.dx + 70, t.dy - 30)]
    strokeWidth : 16
    strokeColor : #2a6f97
    strokeLinecap : "square"
  }
  ensure abs(t.dx) < 110
  ensure abs(t.dy) < 90
}

forall Thing a; Thing b {
  ensure abs(a.dy - b.dy) > 120
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
