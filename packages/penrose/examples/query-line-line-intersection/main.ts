// Where two lines through sampled point pairs cross
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
  t.a0 = (random(-110, -50), random(-60, 60))
  t.a1 = t.a0 + random(40, 70) * unitVector(random(-0.5, 0.5))
  t.b0 = (random(50, 110), random(-60, 60))
  t.b1 = t.b0 + random(40, 70) * unitVector(random(1.0, 2.1))
  t.x = lineLineIntersection(t.a0, t.a1, t.b0, t.b1)
  t.extA = Line {
    start : ptOnLine(t.a0, t.a1, -260)
    end : ptOnLine(t.a0, t.a1, 260)
    strokeWidth : 2
    strokeColor : #9db8dd
    strokeStyle : "dashed"
  }
  t.extB = Line {
    start : ptOnLine(t.b0, t.b1, -260)
    end : ptOnLine(t.b0, t.b1, 260)
    strokeWidth : 2
    strokeColor : #e0a39c
    strokeStyle : "dashed"
  }
  t.a = Line {
    start : t.a0
    end : t.a1
    strokeWidth : 5
    strokeColor : #2f6fbf
  }
  t.b = Line {
    start : t.b0
    end : t.b1
    strokeWidth : 5
    strokeColor : #c0392b
  }
  t.hit = Circle {
    center : t.x
    r : 11
    fillColor : none()
    strokeColor : #333333
    strokeWidth : 4
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
