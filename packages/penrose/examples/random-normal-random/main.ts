// A Gaussian cloud of 30 dots placed with normalRandom()
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    center : (40 * normalRandom(), 28 * normalRandom())
    r : 6
    fillColor : rgba(0.2, 0.45, 0.8, 0.7)
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
