// 3x3 affine matrices compose, and a linear 2x2 one is lifted to join them
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (compose: string): string => `canvas {
  width = 560
  height = 360
}

forall Shape s {
  corners = ((0 - 45, 0 - 45), (45, 0 - 45), (45, 45), (0 - 45, 45))
  mat3x3 M = ${compose}
  s.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : fromHomogeneousList(matrixMultiplyList(M, toHomogeneousList(corners)))
    fillColor : rgba(0.45, 0.75, 0.55, 0.65)
    strokeColor : rgba(0.1, 0.4, 0.2, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const turned = style('rotate(0.7) then translate(150, 40)');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: turned,
    variants: [
      { label: 'rotate then translate', style: turned },
      { label: 'scale then translate', style: style('scale(1.5, 0.6) then translate(150, 40)') },
      { label: 'skew then translate', style: style('skew(0.6) then translate(150, 40)') },
      { label: 'shear then translate', style: style('shear((1.0, 0.0), (0.0, 0.6)) then translate(150, 40)') },
      { label: 'linear rotate2d, lifted', style: style('toHomogeneousMatrix(rotate2d(0.7)) then translate(150, 40)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
