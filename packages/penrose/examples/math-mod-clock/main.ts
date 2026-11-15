// Mod(a, 12) wraps a sampled hour count onto a 12-hour dial
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
  t.h = random(0, 60)
  t.wrapped = mod(t.h, 12)
  t.R = 110
  t.face = Circle {
    center : (0, 0)
    r : t.R
    fillColor : #ffffff
    strokeColor : #666666
    strokeWidth : 3
  }
  t.tick0 = Line {
    start : 0.88 * t.R * unitVector(toRadians(90))
    end : t.R * unitVector(toRadians(90))
    strokeWidth : 4
    strokeColor : #666666
  }
  t.tick1 = Line {
    start : 0.88 * t.R * unitVector(toRadians(0))
    end : t.R * unitVector(toRadians(0))
    strokeWidth : 4
    strokeColor : #666666
  }
  t.tick2 = Line {
    start : 0.88 * t.R * unitVector(toRadians(-90))
    end : t.R * unitVector(toRadians(-90))
    strokeWidth : 4
    strokeColor : #666666
  }
  t.tick3 = Line {
    start : 0.88 * t.R * unitVector(toRadians(-180))
    end : t.R * unitVector(toRadians(-180))
    strokeWidth : 4
    strokeColor : #666666
  }
  t.raw = Line {
    start : (0, 0)
    end : 0.62 * t.R * unitVector(toRadians(90 - t.h * 30))
    strokeWidth : 3
    strokeColor : #bbbbbb
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.hand = Line {
    start : (0, 0)
    end : 0.85 * t.R * unitVector(toRadians(90 - t.wrapped * 30))
    strokeWidth : 5
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.hub = Circle {
    center : (0, 0)
    r : 6
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
