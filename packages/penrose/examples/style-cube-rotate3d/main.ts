// A 3x3 rotation about an axis, applied to the corners before projection
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (angle: string, axis: string): string => `canvas {
  width = 520
  height = 420
}

forall Cube c {
  mat3x3 turn = rotate3d(${angle}, ${axis})
  mat4x4 view = lookAt((2.0, 1.5, 6.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0))
  mat4x4 lens = perspective(35.0, 1.0, 0.1, 50.0)
  -- perspective() flips y; a negative viewport height flips it back
  vec4 viewport = (0 - 210, 210, 420, 0 - 420)
  corners = ((0 - 1, 0 - 1, 0 - 1), (1, 0 - 1, 0 - 1), (1, 1, 0 - 1), (0 - 1, 1, 0 - 1), (0 - 1, 0 - 1, 1), (1, 0 - 1, 1), (1, 1, 1), (0 - 1, 1, 1))
  P = projectList(matrixMultiplyList(turn, corners), view, lens, viewport)
  vec2 p0 = (P[0][0], P[0][1])
  vec2 p1 = (P[1][0], P[1][1])
  vec2 p2 = (P[2][0], P[2][1])
  vec2 p3 = (P[3][0], P[3][1])
  vec2 p4 = (P[4][0], P[4][1])
  vec2 p5 = (P[5][0], P[5][1])
  vec2 p6 = (P[6][0], P[6][1])
  vec2 p7 = (P[7][0], P[7][1])

  c.back = Polygon {
    points : (p0, p1, p2, p3)
    fillColor : rgba(0.9, 0.45, 0.4, 0.3)
    strokeColor : rgba(0.5, 0.15, 0.1, 1.0)
    strokeWidth : 2.5
  }
  c.left = Polygon {
    points : (p0, p3, p7, p4)
    fillColor : rgba(0.7, 0.7, 0.7, 0.25)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.bottom = Polygon {
    points : (p0, p1, p5, p4)
    fillColor : rgba(0.7, 0.7, 0.7, 0.25)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.right = Polygon {
    points : (p1, p2, p6, p5)
    fillColor : rgba(0.7, 0.7, 0.7, 0.25)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.top = Polygon {
    points : (p3, p2, p6, p7)
    fillColor : rgba(0.7, 0.7, 0.7, 0.25)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.front = Polygon {
    points : (p4, p5, p6, p7)
    fillColor : rgba(0.45, 0.65, 0.95, 0.35)
    strokeColor : rgba(0.15, 0.25, 0.6, 1.0)
    strokeWidth : 2.5
  }
}
`;
  const about = style('0.7', '(0.0, 1.0, 0.0)');
  playground(stage, {
    domain: `type Cube
`,
    substance: `Cube C
NoLabel C
`,
    style: about,
    variants: [
      { label: 'about y (0, 1, 0)', style: about },
      { label: 'about x (1, 0, 0)', style: style('0.7', '(1.0, 0.0, 0.0)') },
      { label: 'about the diagonal', style: style('0.7', '(0.577, 0.577, 0.577)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
