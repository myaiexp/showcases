// A rank-one matrix: all of the plane is mapped onto the line through u
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
  vec2 u = ${u}
  vec2 v = ${v}
  mat2x2 O = outerProduct(u, v)
  corners = ((0 - 60, 0 - 60), (60, 0 - 60), (60, 60), (0 - 60, 60))
  s.before = Polygon {
    points : corners
    fillColor : rgba(0.8, 0.8, 0.8, 0.4)
    strokeColor : rgba(0.5, 0.5, 0.5, 1.0)
    strokeWidth : 3.0
  }
  s.line = Line {
    start : (0 - 100) * u
    end : 100 * u
    strokeWidth : 2.0
    strokeColor : rgba(0.2, 0.4, 0.85, 1.0)
    strokeStyle : "dashed"
  }
  s.after = Polygon {
    points : matrixMultiplyList(O, corners)
    fillColor : rgba(0.9, 0.25, 0.2, 0.5)
    strokeColor : rgba(0.8, 0.1, 0.1, 1.0)
    strokeWidth : 6.0
  }
  s.arrow = Line {
    start : (0, 0)
    end : 100 * u
    strokeWidth : 4.0
    strokeColor : rgba(0.2, 0.4, 0.85, 1.0)
    endArrowhead : "straight"
  }
}
`;
  const first = style('(1.0, 0.5)', '(1.0, 0.0)');
  playground(stage, {
    domain: `type Shape
`,
    substance: `Shape Q
NoLabel Q
`,
    style: first,
    variants: [
      { label: 'u (1, 0.5), v (1, 0)', style: first },
      { label: 'u (0.3, 1), v (0, 1)', style: style('(0.3, 1.0)', '(0.0, 1.0)') },
      { label: 'u (1, 1), v (0.7, 0.7)', style: style('(1.0, 1.0)', '(0.7, 0.7)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
