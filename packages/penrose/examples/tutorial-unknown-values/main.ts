// Concrete vector numbers in Style versus the ? placeholder the optimizer fills in
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'open (?, ?)',

      },
      {
        label: 'fixed numbers',
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
  u.vector = (120, 80)
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
    layer u.text above U.xAxis
  layer u.text above U.yAxis
}

forall Vector v; VectorSpace U
where In(v, U) {
  override v.vector = (-150, 60)
  override v.shape.strokeColor = #d4553b
}
`,
      },
    ],
    domain: `type VectorSpace
type Vector
predicate In(Vector, VectorSpace)
`,
    substance: `VectorSpace U
Vector v, w
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
  ensure norm(u.vector) > 70
  layer u.text above U.xAxis
  layer u.text above U.yAxis
}
`,
  });
  return () => stage.dispose();
};

export default mount;
