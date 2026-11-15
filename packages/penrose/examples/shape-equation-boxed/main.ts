// Rectangles fitted to Equation width, height and centre
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing A, B, C
Label A $A \\cap B$
Label B $\\sum_i x_i$
Label C $\\frac{1}{2}\\pi r^2$
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.eq = Equation {
    string : t.label
    fontSize : "30px"
  }
  t.box = Rectangle {
    center : t.eq.center
    width : t.eq.width + 26
    height : t.eq.height + 20
    fillColor : rgba(0.9, 0.95, 1.0, 1.0)
    strokeColor : #1a3a6b
    strokeWidth : 2
    cornerRadius : 8
  }
  t.box below t.eq
}

forall Thing a; Thing b {
  ensure disjoint(a.box, b.box, 14)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
