// rotate(theta, x, y) is a 3x3 matrix turning around the point (x, y)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (angle: string): string => `canvas {
  width = 520
  height = 400
}

forall Shape s {
  corners = ((60, 20), (130, 20), (130, 90), (60, 90))
  mat3x3 T = rotate(${angle}, 30, 0 - 20)
  s.pivot = Circle {
    center : (30, 0 - 20)
    r : 7
    fillColor : rgba(0.1, 0.1, 0.1, 1.0)
    strokeWidth : 0.0
  }
  s.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : fromHomogeneousList(matrixMultiplyList(T, toHomogeneousList(corners)))
    fillColor : rgba(0.95, 0.6, 0.3, 0.7)
    strokeColor : rgba(0.6, 0.3, 0.0, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const small = style('0.8');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: small,
    variants: [
      { label: 'rotate(0.8, 30, -20)', style: small },
      { label: 'rotate(2.0, 30, -20)', style: style('2.0') },
      { label: 'rotate(3.14, 30, -20)', style: style('3.14') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
