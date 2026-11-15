// A circumference unrolled into diameters, and e measured in unit bars
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
  t.r = random(22, 36)
  t.d = 2 * t.r
  t.x0 = -125
  t.circ = Circle {
    center : (t.x0 + t.r, 100)
    r : t.r
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.pi1 = Line {
    start : (t.x0, 20)
    end : (t.x0 + 3 * t.d, 20)
    strokeWidth : 8
    strokeColor : #2f6fbf
  }
  t.pi2 = Line {
    start : (t.x0 + 3 * t.d, 20)
    end : (t.x0 + MathPI() * t.d, 20)
    strokeWidth : 8
    strokeColor : #c0392b
  }
  t.e1 = Line {
    start : (t.x0, -50)
    end : (t.x0 + 2 * t.d, -50)
    strokeWidth : 8
    strokeColor : #2e8b57
  }
  t.e2 = Line {
    start : (t.x0 + 2 * t.d, -50)
    end : (t.x0 + MathE() * t.d, -50)
    strokeWidth : 8
    strokeColor : #e08a1e
  }
  t.lpi = Text {
    string : "circumference = π diameters"
    center : (0, 42)
    fontSize : "18px"
    fillColor : #333333
  }
  t.le = Text {
    string : "e unit bars"
    center : (0, -28)
    fontSize : "18px"
    fillColor : #333333
  }
  t.tick1 = Line {
    start : (t.x0 + t.d, 30)
    end : (t.x0 + t.d, 10)
    strokeWidth : 2
    strokeColor : #ffffff
  }
  t.tick2 = Line {
    start : (t.x0 + 2 * t.d, 30)
    end : (t.x0 + 2 * t.d, 10)
    strokeWidth : 2
    strokeColor : #ffffff
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
