// rotate2d(theta) is a 2x2 matrix; matrixMultiplyList applies it to points
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (step: string): string => `canvas {
  width = 420
  height = 420
}

forall Blade b {
  mat2x2 R = rotate2d(match_id * ${step})
  b.wing = Polygon {
    points : matrixMultiplyList(R, ((10, 0), (150, 0 - 36), (150, 36)))
    fillColor : hsva(60 * match_id, 70, 95, 0.75)
    strokeColor : rgba(0.2, 0.2, 0.2, 1.0)
    strokeWidth : 2.0
  }
}
`;
  const closed = style('1.0472');
  playground(stage, {
    domain: `type Blade
`,
    substance: `Blade a, b, c, d, e, f
NoLabel a, b, c, d, e, f
`,
    style: closed,
    variants: [
      { label: 'step 1.0472 (60°)', style: closed },
      { label: 'step 0.5', style: style('0.5') },
      { label: 'step 1.3', style: style('1.3') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
