// scale2d(sx, sy) is diag(sx, sy): stretch, shrink or mirror
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (factors: string): string => `canvas {
  width = 520
  height = 400
}

forall Shape s {
  corners = ((0 - 40, 0 - 30), (80, 0 - 30), (0 - 40, 60))
  mat2x2 S = scale2d(${factors})
  s.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : matrixMultiplyList(S, corners)
    fillColor : rgba(0.45, 0.75, 0.55, 0.65)
    strokeColor : rgba(0.1, 0.4, 0.2, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const stretch = style('1.6, 0.6');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape T
NoLabel T
`,
    style: stretch,
    variants: [
      { label: 'scale2d(1.6, 0.6)', style: stretch },
      { label: 'scale2d(0.5, 0.5)', style: style('0.5, 0.5') },
      { label: 'scale2d(1.0, -1.0)', style: style('1.0, 0 - 1.0') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
