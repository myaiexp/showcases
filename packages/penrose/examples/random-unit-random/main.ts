// Fill colours built from three unitRandom() calls per shape
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot A, B, C, D, E, F
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.tile = Rectangle {
    width : 70
    height : 70
    cornerRadius : 8
    fillColor : rgba(unitRandom(), unitRandom(), unitRandom(), 0.9)
  }
}

forall Dot a; Dot b {
  ensure disjoint(a.tile, b.tile, 10)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
