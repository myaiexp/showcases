// Forty dots scattered evenly over a disk with diskRandom()
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, D32, D33, D34, D35, D36, D37, D38, D39, D40
`,
    style: `canvas {
  width = 400
  height = 300
}

ring {
  edge = Circle {
    center : (0, 0)
    r : 120
    fillColor : none()
    strokeColor : #888888
    strokeWidth : 2
    strokeDasharray : "6 4"
  }
}

forall Dot d {
  d.icon = Circle {
    center : 120 * diskRandom()
    r : 6
    fillColor : rgba(0.85, 0.35, 0.35, 0.75)
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
