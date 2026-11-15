// Declare-then-assign versus declare-and-assign for a function result in Substance
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    variants: [
      {
        label: 'u := addV(v, w)',

      },
      {
        label: 'Vector u := …',
        substance: `Vector v, w
Vector u := addV(v, w)
AutoLabel All
`,
      },
    ],
    domain: `type Vector
function addV(Vector, Vector) -> Vector
`,
    substance: `Vector v, w, u
u := addV(v, w)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Vector v {
  v.vector = (?, ?)
  v.shape = Line {
    start : (-120, -80)
    end : (-120, -80) + v.vector
    strokeWidth : 4.0
    strokeColor : #3b6fd4
    endArrowhead : "straight"
  }
  v.text = Equation {
    string : v.label
    fillColor : #3b6fd4
    fontSize : "28px"
  }
  ensure vdist(v.shape.end, v.text.center) == 24.0
  ensure norm(v.vector) > 80
  ensure norm(v.vector) < 220
}

forall Vector u; Vector v; Vector w
where u := addV(v, w) {
  override u.shape.end = (-120, -80) + v.vector + w.vector
  override u.shape.strokeColor = #d4553b
  override u.text.fillColor = #d4553b
}
`,
  });
  return () => stage.dispose();
};

export default mount;
