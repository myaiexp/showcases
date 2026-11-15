// fillRule nonzero and evenodd on a self-crossing pentagram Polygon
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'fillRule: "nonzero"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.star = Polygon {
    points : [(0, 120), (70, -100), (-115, 36), (115, 36), (-70, -100)]
    fillColor : rgba(0.95, 0.65, 0.2, 0.9)
    strokeColor : #7a4a00
    strokeWidth : 3
    fillRule : "nonzero"
  }
}
`,
      },
      {
        label: 'fillRule: "evenodd"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.star = Polygon {
    points : [(0, 120), (70, -100), (-115, 36), (115, 36), (-70, -100)]
    fillColor : rgba(0.95, 0.65, 0.2, 0.9)
    strokeColor : #7a4a00
    strokeWidth : 3
    fillRule : "evenodd"
  }
}
`,
      },
    ],
    domain: `type Dot
`,
    substance: `Dot A
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
