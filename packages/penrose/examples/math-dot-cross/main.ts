// Projection from a dot product and area from a 2D cross product
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.o = (-100, -95)
  t.u = random(90, 120) * unitVector(random(0.1, 0.8))
  t.v = random(70, 100) * unitVector(random(1.3, 2.3))
  t.vhat = normalize(t.v)
  t.proj = dot(t.u, t.vhat) * t.vhat
  t.area = abs(cross2D(t.u, t.v))
  t.side = sqrt(t.area)
  t.para = Polygon {
    points : [t.o, t.o + t.u, t.o + t.u + t.v, t.o + t.v]
    fillColor : #4f8fdc44
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.uArrow = Line {
    start : t.o
    end : t.o + t.u
    strokeWidth : 4
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.vArrow = Line {
    start : t.o
    end : t.o + t.v
    strokeWidth : 4
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.drop = Line {
    start : t.o + t.u
    end : t.o + t.proj
    strokeWidth : 2
    strokeColor : #c0392b
    strokeStyle : "dashed"
  }
  t.shadow = Line {
    start : t.o
    end : t.o + t.proj
    strokeWidth : 7
    strokeColor : #c0392b
  }
  t.square = Rectangle {
    center : (125, -20)
    width : t.side
    height : t.side
    fillColor : #4f8fdc44
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.l1 = Text {
    string : "same area"
    center : (125, 110)
    fontSize : "18px"
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
