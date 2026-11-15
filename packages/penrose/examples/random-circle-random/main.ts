// Spokes to random points on a circle from circleRandom()
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.tip = 110 * circleRandom()
  d.spoke = Line {
    start : (0, 0)
    end : d.tip
    strokeWidth : 1.5
    strokeColor : #777777
  }
  d.icon = Circle {
    center : d.tip
    r : 6
    fillColor : #2a6f97
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
