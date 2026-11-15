// A function with named arguments applied in Substance and matched in Style
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    domain: `type Vector
function addVector (Vector v1, Vector v2) -> Vector
`,
    substance: `Vector a, b
Vector c := addVector(a, b)
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

forall Vector c; Vector a; Vector b
where c := addVector(a, b) {
  override c.shape.end = (-120, -80) + a.vector + b.vector
  override c.shape.strokeColor = #d4553b
  override c.text.fillColor = #d4553b
}
`,
  });
  return () => stage.dispose();
};

export default mount;
