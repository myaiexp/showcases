// inverse(M) undoes M, and determinant(M) is the factor M scales area by
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (entries: string): string => `canvas {
  width = 600
  height = 380
}

forall Shape s {
  corners = ((0 - 50, 0 - 50), (50, 0 - 50), (50, 50), (0 - 50, 50))
  mat2x2 M = ${entries}
  mat2x2 Mi = inverse(M)
  moved = matrixMultiplyList(M, corners)
  s.original = Polygon {
    points : corners
    fillColor : rgba(0.8, 0.8, 0.8, 0.5)
    strokeColor : rgba(0.5, 0.5, 0.5, 1.0)
    strokeWidth : 3.0
  }
  s.moved = Polygon {
    points : moved
    fillColor : rgba(0.4, 0.55, 0.95, 0.45)
    strokeColor : rgba(0.15, 0.25, 0.7, 1.0)
    strokeWidth : 3.0
  }
  s.back = Polygon {
    points : matrixMultiplyList(Mi, moved)
    fillColor : none()
    strokeColor : rgba(0.9, 0.2, 0.2, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.gauge = Circle {
    center : (210, 0 - 110)
    r : 40 * sqrt(determinant(M))
    fillColor : rgba(0.95, 0.75, 0.3, 0.5)
    strokeColor : rgba(0.6, 0.4, 0.0, 1.0)
    strokeWidth : 2.0
  }
  s.unit = Circle {
    center : (210, 0 - 110)
    r : 40
    fillColor : none()
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
    strokeStyle : "dashed"
  }
}
`;
  const grow = style('((1.4, 0.5), (0 - 0.2, 1.1))');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: grow,
    variants: [
      { label: 'det 1.64: area grows', style: grow },
      { label: 'det 0.36: area shrinks', style: style('((0.6, 0.0), (0.0, 0.6))') },
      { label: 'det 1.0: shear keeps area', style: style('((1.0, 0.7), (0.0, 1.0))') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
