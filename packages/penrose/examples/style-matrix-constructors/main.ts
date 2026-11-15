// identity(n), diagonal(v) and matrix(a..f) build matrices from numbers
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (make: string, apply: string): string => `canvas {
  width = 520
  height = 380
}

forall Shape s {
  corners = ((0 - 55, 0 - 55), (55, 0 - 55), (55, 55), (0 - 55, 55))
  ${make}
  s.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : ${apply}
    fillColor : rgba(0.6, 0.55, 0.9, 0.6)
    strokeColor : rgba(0.25, 0.2, 0.6, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const same = style('mat2x2 M = identity(2)', 'matrixMultiplyList(M, corners)');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: same,
    variants: [
      { label: 'identity(2)', style: same },
      { label: 'diagonal((1.8, 0.5))', style: style('mat2x2 M = diagonal((1.8, 0.5))', 'matrixMultiplyList(M, corners)') },
      {
        label: 'matrix(1, 0, 0.6, 1, 60, 20)',
        style: style(
          'mat3x3 M = matrix(1.0, 0.0, 0.6, 1.0, 60.0, 20.0)',
          'fromHomogeneousList(matrixMultiplyList(M, toHomogeneousList(corners)))',
        ),
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
