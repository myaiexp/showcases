// Exercise: dashed lines complete the parallelogram behind u := addV(v, w)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type VectorSpace
type Vector
predicate In(Vector, VectorSpace)
function addV(Vector, Vector) -> Vector
`,
    substance: `VectorSpace U
Vector v, w
Vector u := addV(v, w)
In(u, U)
In(v, U)
In(w, U)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall VectorSpace U {
  U.origin = (0, 0)
  U.background = Rectangle {
    center : U.origin
    width : 480
    height : 380
    fillColor : rgba(0.95, 0.96, 1.0, 1.0)
    strokeColor : #8890a8
    strokeWidth : 2.0
  }
  U.xAxis = Line {
    start : (U.origin[0] - 240, U.origin[1])
    end : (U.origin[0] + 240, U.origin[1])
    strokeWidth : 1.5
    strokeColor : #8890a8
  }
  U.yAxis = Line {
    start : (U.origin[0], U.origin[1] - 190)
    end : (U.origin[0], U.origin[1] + 190)
    strokeWidth : 1.5
    strokeColor : #8890a8
  }
}

forall Vector u; VectorSpace U
where In(u, U) {
  u.vector = (?, ?)
  u.shape = Line {
    start : U.origin
    end : U.origin + u.vector
    strokeWidth : 4.0
    strokeColor : #3b6fd4
    endArrowhead : "straight"
    endArrowheadSize : 1.2
  }
  u.text = Equation {
    string : u.label
    fillColor : u.shape.strokeColor
    fontSize : "28px"
  }
  ensure contains(U.background, u.shape)
  ensure contains(U.background, u.text)
  ensure vdist(u.shape.end, u.text.center) == 24.0
  ensure norm(u.vector) > 40
  layer u.text above U.xAxis
  layer u.text above U.yAxis
  ensure norm(u.vector) < 200
}

forall Vector u; Vector v; Vector w; VectorSpace U
where u := addV(v, w); In(u, U); In(v, U); In(w, U) {
  override u.shape.end = v.shape.end + w.shape.end - U.origin
  u.fromV = Line {
    start : v.shape.end
    end : u.shape.end
    strokeWidth : 2.0
    strokeColor : #8890a8
    strokeDasharray : "7,5"
  }
  u.fromW = Line {
    start : w.shape.end
    end : u.shape.end
    strokeWidth : 2.0
    strokeColor : #8890a8
    strokeDasharray : "7,5"
  }
  layer u.fromV below v.shape
  layer u.fromW below w.shape
}
`,
  });
  return () => stage.dispose();
};

export default mount;
