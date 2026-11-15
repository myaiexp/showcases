// M[i][j] reads one entry; the entries stay unknown until optimized
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Matrix
`,
    substance: `Matrix M
NoLabel M
`,
    style: `canvas {
  width = 600
  height = 300
}

forall Matrix m {
  mat2x2 M = ((?, ?), (?, ?))
  scalar trM = M[0][0] + M[1][1]
  ensure trM == 240.0
  ensure M[0][0] > 30.0
  ensure M[1][1] > 30.0

  -- the two diagonal entries as bars laid end to end
  m.first = Rectangle {
    center : (0 - 120 + M[0][0] / 2, 0)
    width : M[0][0]
    height : 70
    fillColor : rgba(0.4, 0.6, 0.95, 0.85)
    strokeWidth : 0.0
  }
  m.second = Rectangle {
    center : (0 - 120 + M[0][0] + M[1][1] / 2, 0)
    width : M[1][1]
    height : 70
    fillColor : rgba(0.95, 0.65, 0.3, 0.85)
    strokeWidth : 0.0
  }
  m.total = Line {
    start : (0 - 120, 70)
    end : (0 - 120 + trM, 70)
    strokeWidth : 3.0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
