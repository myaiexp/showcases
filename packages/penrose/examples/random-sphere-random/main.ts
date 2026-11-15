// A sphere of random points projected flat, nearer ones larger
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, D25, D26, D27, D28, D29, D30, D31, D32, D33, D34, D35, D36, D37, D38, D39, D40, D41, D42, D43, D44, D45, D46, D47, D48, D49, D50, D51, D52, D53, D54, D55, D56, D57, D58, D59, D60
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  vec3 d.p = sphereRandom()
  d.icon = Circle {
    center : (115 * d.p[0], 115 * d.p[1])
    r : 6 + 3 * d.p[2]
    fillColor : rgba(0.25, 0.5, 0.75, 0.6)
    strokeColor : #1a3a6b
    strokeWidth : 1
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
