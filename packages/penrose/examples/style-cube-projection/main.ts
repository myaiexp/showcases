// Two perspective lenses and a parallel projection of one cube
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (eye: string, lens: string, viewport: string): string => `canvas {
  width = 520
  height = 420
}

forall Cube c {
  mat4x4 view = lookAt(${eye}, (0.0, 0.0, 0.0), (0.0, 1.0, 0.0))
  mat4x4 lens = ${lens}
  vec4 viewport = ${viewport}
  corners = ((0 - 1, 0 - 1, 0 - 1), (1, 0 - 1, 0 - 1), (1, 1, 0 - 1), (0 - 1, 1, 0 - 1), (0 - 1, 0 - 1, 1), (1, 0 - 1, 1), (1, 1, 1), (0 - 1, 1, 1))
  P = projectList(corners, view, lens, viewport)
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
    strokeColor : rgba(0.6, 0.15, 0.1, 1.0)
    strokeWidth : 2.5
  }
  c.front = Polygon {
    points : (p4, p5, p6, p7)
    fillColor : rgba(0.45, 0.65, 0.95, 0.3)
    strokeColor : rgba(0.15, 0.25, 0.6, 1.0)
    strokeWidth : 2.5
  }
  c.left = Polygon {
    points : (p0, p3, p7, p4)
    fillColor : rgba(0.7, 0.7, 0.7, 0.2)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.right = Polygon {
    points : (p1, p2, p6, p5)
    fillColor : rgba(0.7, 0.7, 0.7, 0.2)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.bottom = Polygon {
    points : (p0, p1, p5, p4)
    fillColor : rgba(0.7, 0.7, 0.7, 0.2)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
  c.top = Polygon {
    points : (p3, p2, p6, p7)
    fillColor : rgba(0.7, 0.7, 0.7, 0.2)
    strokeColor : rgba(0.3, 0.3, 0.3, 1.0)
    strokeWidth : 2.0
  }
}
`;
  // perspective() negates y, so its viewport has a negative height; ortho() keeps y up
  const flipped = '(0 - 210, 210, 420, 0 - 420)';
  const narrow = style('(4.0, 3.0, 5.0)', 'perspective(30.0, 1.0, 0.1, 50.0)', flipped);
  playground(stage, {
    domain: `type Cube
`,
    substance: `Cube C
NoLabel C
`,
    style: narrow,
    variants: [
      { label: 'perspective(30)', style: narrow },
      { label: 'perspective(75)', style: style('(2.0, 1.5, 2.5)', 'perspective(75.0, 1.0, 0.1, 50.0)', flipped) },
      { label: 'ortho(-2.5, 2.5, -2.5, 2.5)', style: style('(4.0, 3.0, 5.0)', 'ortho(0 - 2.5, 2.5, 0 - 2.5, 2.5, 0.1, 50.0)', '(0 - 210, 0 - 210, 420, 420)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
