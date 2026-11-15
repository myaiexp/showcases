// The hypotenuse from sqrt(a² + b²), swung onto the axis
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
  t.o = (-130, -80)
  t.a = random(70, 160)
  t.b = random(50, 130)
  t.c = sqrt(sqr(t.a) + sqr(t.b))
  t.hyp = (t.a, t.b)
  t.tri = Polygon {
    points : [t.o, t.o + (t.a, 0), t.o + (t.a, t.b)]
    fillColor : #4f8fdc44
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.swing = Path {
    d : circularArc("open", t.o, t.c, 0, angleOf(t.hyp))
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.foot = Circle {
    center : t.o + (t.c, 0)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.corner = Circle {
    center : t.o + t.hyp
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.check = Circle {
    center : t.o + (sqrt(normsq(t.hyp)), 0)
    r : 3
    fillColor : #ffffff
    strokeWidth : 0
  }
  t.la = Text {
    string : "a"
    center : t.o + (t.a / 2, -16)
    fontSize : "18px"
    fillColor : #333333
  }
  t.lb = Text {
    string : "b"
    center : t.o + (t.a + 16, t.b / 2)
    fontSize : "18px"
    fillColor : #333333
  }
  t.lc = Text {
    string : "c"
    center : t.o + (t.a / 2 - 16, t.b / 2 + 14)
    fontSize : "18px"
    fillColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
