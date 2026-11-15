// Polygon whose points are offsets from two unknowns the optimizer moves
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing A, B, C
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.dx = ?
  t.dy = ?
  t.shape = Polygon {
    points : [(t.dx - 45, t.dy - 35), (t.dx + 45, t.dy - 35), (t.dx, t.dy + 45)]
    fillColor : rgba(0.85, 0.45, 0.6, 0.85)
    strokeColor : #6a1f3a
    strokeWidth : 3
  }
  ensure abs(t.dx) < 120
  ensure abs(t.dy) < 70
}

forall Thing a; Thing b {
  ensure norm((a.dx, a.dy) - (b.dx, b.dy)) > 140
}
`,
  });
  return () => stage.dispose();
};

export default mount;
