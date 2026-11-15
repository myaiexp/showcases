// A*u and u*A are different vectors for a matrix that is not symmetric
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Arrow
`,
    substance: `Arrow A
NoLabel A
`,
    style: `canvas {
  width = 560
  height = 400
}

forall Arrow a {
  vec2 o = (0 - 200, 0 - 140)
  vec2 u = (120, 80)
  mat2x2 A = ((1.0, 0.6), (0 - 0.3, 1.0))
  vec2 col = A * u
  vec2 row = u * A

  a.u = Line {
    start : o
    end : o + u
    strokeWidth : 4.0
    strokeColor : rgba(0.5, 0.5, 0.5, 1.0)
    endArrowhead : "straight"
  }
  a.col = Line {
    start : o
    end : o + col
    strokeWidth : 6.0
    strokeColor : rgba(0.2, 0.4, 0.85, 1.0)
    endArrowhead : "straight"
  }
  a.row = Line {
    start : o
    end : o + row
    strokeWidth : 6.0
    strokeColor : rgba(0.95, 0.6, 0.15, 1.0)
    endArrowhead : "straight"
  }
  a.colName = Text {
    string : "A * u"
    center : o + col + (30, 0)
    fontSize : "24px"
    fillColor : rgba(0.2, 0.4, 0.85, 1.0)
  }
  a.rowName = Text {
    string : "u * A"
    center : o + row + (0, 24)
    fontSize : "24px"
    fillColor : rgba(0.95, 0.6, 0.15, 1.0)
  }
  a.uName = Text {
    string : "u"
    center : o + u + (0 - 22, 0 - 6)
    fontSize : "24px"
    fillColor : rgba(0.4, 0.4, 0.4, 1.0)
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
