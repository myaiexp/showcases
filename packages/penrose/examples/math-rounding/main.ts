// Three roundings of a sampled number on a number line
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
  t.v = random(-3.9, 3.9)
  t.u = 45
  t.axis = Line {
    start : (-190, 40)
    end : (190, 40)
    strokeWidth : 2
    strokeColor : #bbbbbb
  }
  t.val = Circle {
    center : (t.v * t.u, 40)
    r : 9
    fillColor : rgba(0.45 + 0.4 * sign(t.v), 0.4, 0.5 - 0.4 * sign(t.v), 1.0)
    strokeWidth : 0
  }
  t.f = Line {
    start : (t.v * t.u, 40)
    end : (floor(t.v) * t.u, 0)
    strokeWidth : 2
    strokeColor : #2f6fbf
  }
  t.fd = Circle {
    center : (floor(t.v) * t.u, 0)
    r : 8
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.c = Line {
    start : (t.v * t.u, 40)
    end : (ceil(t.v) * t.u, -35)
    strokeWidth : 2
    strokeColor : #c0392b
  }
  t.cd = Circle {
    center : (ceil(t.v) * t.u, -35)
    r : 8
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.tr = Line {
    start : (t.v * t.u, 40)
    end : (trunc(t.v) * t.u, -70)
    strokeWidth : 2
    strokeColor : #e08a1e
  }
  t.td = Circle {
    center : (trunc(t.v) * t.u, -70)
    r : 8
    fillColor : #e08a1e
    strokeWidth : 0
  }
  t.lf = Text {
    string : "floor"
    center : (-160, 0)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.lc = Text {
    string : "ceil"
    center : (-160, -35)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.lt = Text {
    string : "trunc"
    center : (-160, -70)
    fontSize : "18px"
    fillColor : #e08a1e
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
