// Matrix-matrix operators, shown by what they do to a square
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (product: string): string => `canvas {
  width = 520
  height = 400
}

forall Square q {
  mat2x2 A = rotate2d(0.6)
  mat2x2 B = scale2d(1.6, 0.6)
  corners = ((0 - 50, 0 - 50), (50, 0 - 50), (50, 50), (0 - 50, 50))
  mat2x2 M = ${product}

  q.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  q.after = Polygon {
    points : matrixMultiplyList(M, corners)
    fillColor : rgba(0.4, 0.7, 0.55, 0.6)
    strokeColor : rgba(0.1, 0.4, 0.25, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const star = style('A * B');
  playground(stage, {
    domain: `type Square
`,
    substance: `Square Q
NoLabel Q
`,
    style: star,
    variants: [
      { label: 'A * B', style: star },
      { label: 'A then B', style: style('A then B') },
      { label: "A'", style: style("A'") },
      { label: 'A + B', style: style('A + B') },
      { label: 'A .* B', style: style('A .* B') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
