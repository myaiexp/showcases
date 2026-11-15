// 4x4 affine matrices move the cube, translation included, before projection
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (compose: string): string => `canvas {
  width = 560
  height = 400
}

forall Cube c {
  mat4x4 M = ${compose}
  mat4x4 view = lookAt((1.5, 3.0, 8.0), (1.0, 0.0, 0.0), (0.0, 1.0, 0.0))
  mat4x4 lens = perspective(40.0, 1.4, 0.1, 50.0)
  -- perspective() flips y; a negative viewport height flips it back
  vec4 viewport = (0 - 280, 200, 560, 0 - 400)
  corners = ((0 - 1, 0 - 1, 0 - 1), (1, 0 - 1, 0 - 1), (1, 1, 0 - 1), (0 - 1, 1, 0 - 1), (0 - 1, 0 - 1, 1), (1, 0 - 1, 1), (1, 1, 1), (0 - 1, 1, 1))
  moved = fromHomogeneousList(matrixMultiplyList(M, toHomogeneousList(corners)))
  P = projectList(moved, view, lens, viewport)
  G = projectList(corners, view, lens, viewport)
  vec2 p0 = (P[0][0], P[0][1])
  vec2 p1 = (P[1][0], P[1][1])
  vec2 p2 = (P[2][0], P[2][1])
  vec2 p3 = (P[3][0], P[3][1])
  vec2 p4 = (P[4][0], P[4][1])
  vec2 p5 = (P[5][0], P[5][1])
  vec2 p6 = (P[6][0], P[6][1])
  vec2 p7 = (P[7][0], P[7][1])
  vec2 g4 = (G[4][0], G[4][1])
  vec2 g5 = (G[5][0], G[5][1])
  vec2 g6 = (G[6][0], G[6][1])
  vec2 g7 = (G[7][0], G[7][1])

  c.ghost = Polygon {
    points : (g4, g5, g6, g7)
    fillColor : none()
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
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
  const slide = style('translate3dh(2.5, 0.0, 0.0)');
  playground(stage, {
    domain: `type Cube
`,
    substance: `Cube C
NoLabel C
`,
    style: slide,
    variants: [
      { label: 'translate3dh(2.5, 0, 0)', style: slide },
      { label: 'rotate3dh then translate3dh', style: style('rotate3dh(0.8, (0.0, 1.0, 0.0)) then translate3dh(2.5, 0.0, 0.0)') },
      { label: 'translate3dh then rotate3dh', style: style('translate3dh(2.5, 0.0, 0.0) then rotate3dh(0.5, (0.0, 1.0, 0.0))') },
      { label: 'scale3dh then translate3dh', style: style('scale3dh(0.6, 1.4, 0.6) then translate3dh(2.5, 0.0, 0.0)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
