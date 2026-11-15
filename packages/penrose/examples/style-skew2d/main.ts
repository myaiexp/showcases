// skew2d(ax, ay) = [[1, tan ax], [tan ay, 1]]
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (angles: string): string => `canvas {
  width = 520
  height = 400
}

forall Shape s {
  corners = ((0 - 60, 0 - 60), (60, 0 - 60), (60, 60), (0 - 60, 60))
  mat2x2 K = skew2d(${angles})
  s.before = Polygon {
    points : corners
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : matrixMultiplyList(K, corners)
    fillColor : rgba(0.95, 0.65, 0.3, 0.65)
    strokeColor : rgba(0.6, 0.3, 0.0, 1.0)
    strokeWidth : 4.0
  }
}
`;
  const horizontal = style('0.5');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: horizontal,
    variants: [
      { label: 'skew2d(0.5)', style: horizontal },
      { label: 'skew2d(0, 0.5)', style: style('0.0, 0.5') },
      { label: 'skew2d(0.4, 0.3)', style: style('0.4, 0.3') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
