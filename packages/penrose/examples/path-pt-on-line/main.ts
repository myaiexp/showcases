// Points at multiples of a sampled distance along a sampled line
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
  t.A = (random(-150, -100), random(-70, 70))
  t.B = (random(60, 130), random(-70, 70))
  t.step = random(30, 75)
  t.line = Line {
    start : t.A
    end : t.B
    strokeWidth : 3
    strokeColor : #bbbbbb
  }
  t.a = Circle {
    center : t.A
    r : 7
    fillColor : #333333
    strokeWidth : 0
  }
  t.b = Circle {
    center : t.B
    r : 7
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.s1 = Circle {
    center : ptOnLine(t.A, t.B, t.step)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.s2 = Circle {
    center : ptOnLine(t.A, t.B, 2 * t.step)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.s3 = Circle {
    center : ptOnLine(t.A, t.B, 3 * t.step)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.s4 = Circle {
    center : ptOnLine(t.A, t.B, 4 * t.step)
    r : 6
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.la = Text {
    string : "p1"
    center : t.A + (0, 20)
    fontSize : "18px"
    fillColor : #333333
  }
  t.lb = Text {
    string : "p2"
    center : t.B + (0, 20)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
