// Twelve discs around a ring, one per 30 degrees of hue
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
  t.s = random(40, 100)
  t.v = random(55, 100)
  t.h0 = Circle {
    center : 95 * unitVector(toRadians(0))
    r : 28
    fillColor : hsva(0, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h1 = Circle {
    center : 95 * unitVector(toRadians(30))
    r : 28
    fillColor : hsva(30, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h2 = Circle {
    center : 95 * unitVector(toRadians(60))
    r : 28
    fillColor : hsva(60, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h3 = Circle {
    center : 95 * unitVector(toRadians(90))
    r : 28
    fillColor : hsva(90, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h4 = Circle {
    center : 95 * unitVector(toRadians(120))
    r : 28
    fillColor : hsva(120, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h5 = Circle {
    center : 95 * unitVector(toRadians(150))
    r : 28
    fillColor : hsva(150, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h6 = Circle {
    center : 95 * unitVector(toRadians(180))
    r : 28
    fillColor : hsva(180, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h7 = Circle {
    center : 95 * unitVector(toRadians(210))
    r : 28
    fillColor : hsva(210, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h8 = Circle {
    center : 95 * unitVector(toRadians(240))
    r : 28
    fillColor : hsva(240, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h9 = Circle {
    center : 95 * unitVector(toRadians(270))
    r : 28
    fillColor : hsva(270, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h10 = Circle {
    center : 95 * unitVector(toRadians(300))
    r : 28
    fillColor : hsva(300, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.h11 = Circle {
    center : 95 * unitVector(toRadians(330))
    r : 28
    fillColor : hsva(330, t.s, t.v, 1)
    strokeWidth : 0
  }
  t.core = Circle {
    center : (0, 0)
    r : 42
    fillColor : hsva(0, 0, t.v, 1)
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
