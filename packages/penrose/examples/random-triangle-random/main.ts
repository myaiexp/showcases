// Dots scattered uniformly inside a fixed triangle
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

frame {
  a = (-130, -100)
  b = (130, -100)
  c = (20, 110)
  outline = Polygon {
    points : [a, b, c]
    fillColor : rgba(0.95, 0.9, 0.7, 1.0)
    strokeColor : #7a5a00
    strokeWidth : 2
  }
}

forall Dot d {
  d.icon = Circle {
    center : triangleRandom(frame.a, frame.b, frame.c)
    r : 5
    fillColor : #b5446e
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
