// A circle on the diameter between two sampled points
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
  t.A = (random(-120, -70), random(-35, 35))
  t.B = (random(70, 120), random(-35, 35))
  t.mid = midpoint(t.A, t.B)
  t.r = vdist(t.A, t.B) / 2
  t.quarter = t.A + vmul(0.25, t.B - t.A)
  t.ring = Circle {
    center : t.mid
    r : t.r
    fillColor : #4f8fdc22
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.diameter = Line {
    start : t.A
    end : t.B
    strokeWidth : 2
    strokeColor : #333333
  }
  t.a = Circle {
    center : t.A
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.b = Circle {
    center : t.B
    r : 7
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.m = Circle {
    center : t.mid
    r : 6
    fillColor : #333333
    strokeWidth : 0
  }
  t.q = Circle {
    center : t.quarter
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.la = Text {
    string : "A"
    center : t.A + (0, 20)
    fontSize : "18px"
    fillColor : #333333
  }
  t.lb = Text {
    string : "B"
    center : t.B + (0, 20)
    fontSize : "18px"
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
