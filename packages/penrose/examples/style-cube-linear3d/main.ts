// Linear 3D transformations: 3x3 matrices with no homogeneous coordinate
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (matrix: string): string => `canvas {
  width = 520
  height = 420
}

forall Cube c {
  mat3x3 M = ${matrix}
  mat4x4 view = lookAt((2.0, 1.5, 6.0), (0.0, 0.0, 0.0), (0.0, 1.0, 0.0))
  mat4x4 lens = perspective(35.0, 1.0, 0.1, 50.0)
  -- perspective() flips y; a negative viewport height flips it back
  vec4 viewport = (0 - 210, 210, 420, 0 - 420)
  corners = ((0 - 1, 0 - 1, 0 - 1), (1, 0 - 1, 0 - 1), (1, 1, 0 - 1), (0 - 1, 1, 0 - 1), (0 - 1, 0 - 1, 1), (1, 0 - 1, 1), (1, 1, 1), (0 - 1, 1, 1))
  P = projectList(matrixMultiplyList(M, corners), view, lens, viewport)
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
    fillColor : rgba(0.5, 0.8, 0.55, 0.4)
    strokeColor : rgba(0.1, 0.4, 0.2, 1.0)
    strokeWidth : 2.5
  }
}
`;
  const tall = style('scale3d(0.7, 1.4, 0.7)');
  playground(stage, {
    domain: `type Cube
`,
    substance: `Cube C
NoLabel C
`,
    style: tall,
    variants: [
      { label: 'scale3d(0.7, 1.4, 0.7)', style: tall },
      { label: 'shear3d((1,0,0), (0,0.8,0))', style: style('shear3d((1.0, 0.0, 0.0), (0.0, 0.8, 0.0))') },
      { label: 'scale3d * rotate3d', style: style('scale3d(1.4, 0.6, 1.0) * rotate3d(0.6, (0.0, 1.0, 0.0))') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
