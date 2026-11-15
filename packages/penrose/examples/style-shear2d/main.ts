// shear2d(u, v): x -> x + dot(v, x) * u
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (u: string, v: string): string => `canvas {
  width = 520
  height = 400
}

forall Shape s {
  corners = ((0 - 60, 0 - 60), (60, 0 - 60), (60, 60), (0 - 60, 60))
  mat2x2 H = shear2d(${u}, ${v})
  s.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : matrixMultiplyList(H, corners)
    fillColor : rgba(0.55, 0.6, 0.95, 0.65)
    strokeColor : rgba(0.15, 0.2, 0.6, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const sideways = style('(1.0, 0.0)', '(0.0, 0.6)');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: sideways,
    variants: [
      { label: 'u (1, 0), v (0, 0.6)', style: sideways },
      { label: 'u (0, 1), v (0.6, 0)', style: style('(0.0, 1.0)', '(0.6, 0.0)') },
      { label: 'u (1, 1), v (0.3, -0.3)', style: style('(1.0, 1.0)', '(0.3, 0 - 0.3)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
