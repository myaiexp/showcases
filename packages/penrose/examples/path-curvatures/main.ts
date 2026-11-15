// Disc size shows how sharply a sampled curve bends at each point
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
  t.w = random(18, 34)
  t.pts = [(1 * (95 + t.w * 1), 0 * (70 + 0.7 * t.w * 1)), (0.94 * (95 + t.w * 0.5), 0.342 * (70 + 0.7 * t.w * 0.5)), (0.766 * (95 + t.w * -0.5), 0.643 * (70 + 0.7 * t.w * -0.5)), (0.5 * (95 + t.w * -1), 0.866 * (70 + 0.7 * t.w * -1)), (0.174 * (95 + t.w * -0.5), 0.985 * (70 + 0.7 * t.w * -0.5)), (-0.174 * (95 + t.w * 0.5), 0.985 * (70 + 0.7 * t.w * 0.5)), (-0.5 * (95 + t.w * 1), 0.866 * (70 + 0.7 * t.w * 1)), (-0.766 * (95 + t.w * 0.5), 0.643 * (70 + 0.7 * t.w * 0.5)), (-0.94 * (95 + t.w * -0.5), 0.342 * (70 + 0.7 * t.w * -0.5)), (-1 * (95 + t.w * -1), 0 * (70 + 0.7 * t.w * -1)), (-0.94 * (95 + t.w * -0.5), -0.342 * (70 + 0.7 * t.w * -0.5)), (-0.766 * (95 + t.w * 0.5), -0.643 * (70 + 0.7 * t.w * 0.5)), (-0.5 * (95 + t.w * 1), -0.866 * (70 + 0.7 * t.w * 1)), (-0.174 * (95 + t.w * 0.5), -0.985 * (70 + 0.7 * t.w * 0.5)), (0.174 * (95 + t.w * -0.5), -0.985 * (70 + 0.7 * t.w * -0.5)), (0.5 * (95 + t.w * -1), -0.866 * (70 + 0.7 * t.w * -1)), (0.766 * (95 + t.w * -0.5), -0.643 * (70 + 0.7 * t.w * -0.5)), (0.94 * (95 + t.w * 0.5), -0.342 * (70 + 0.7 * t.w * 0.5))]
  t.k = curvatures(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #bbbbbb
    strokeWidth : 3
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 4 + 500 * abs(t.k[0])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[0]), 0.3, 0.5 - 0.4 * sign(t.k[0]), 0.6)
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 4 + 500 * abs(t.k[1])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[1]), 0.3, 0.5 - 0.4 * sign(t.k[1]), 0.6)
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 4 + 500 * abs(t.k[2])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[2]), 0.3, 0.5 - 0.4 * sign(t.k[2]), 0.6)
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 4 + 500 * abs(t.k[3])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[3]), 0.3, 0.5 - 0.4 * sign(t.k[3]), 0.6)
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 4 + 500 * abs(t.k[4])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[4]), 0.3, 0.5 - 0.4 * sign(t.k[4]), 0.6)
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 4 + 500 * abs(t.k[5])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[5]), 0.3, 0.5 - 0.4 * sign(t.k[5]), 0.6)
    strokeWidth : 0
  }
  t.d6 = Circle {
    center : t.pts[6]
    r : 4 + 500 * abs(t.k[6])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[6]), 0.3, 0.5 - 0.4 * sign(t.k[6]), 0.6)
    strokeWidth : 0
  }
  t.d7 = Circle {
    center : t.pts[7]
    r : 4 + 500 * abs(t.k[7])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[7]), 0.3, 0.5 - 0.4 * sign(t.k[7]), 0.6)
    strokeWidth : 0
  }
  t.d8 = Circle {
    center : t.pts[8]
    r : 4 + 500 * abs(t.k[8])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[8]), 0.3, 0.5 - 0.4 * sign(t.k[8]), 0.6)
    strokeWidth : 0
  }
  t.d9 = Circle {
    center : t.pts[9]
    r : 4 + 500 * abs(t.k[9])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[9]), 0.3, 0.5 - 0.4 * sign(t.k[9]), 0.6)
    strokeWidth : 0
  }
  t.d10 = Circle {
    center : t.pts[10]
    r : 4 + 500 * abs(t.k[10])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[10]), 0.3, 0.5 - 0.4 * sign(t.k[10]), 0.6)
    strokeWidth : 0
  }
  t.d11 = Circle {
    center : t.pts[11]
    r : 4 + 500 * abs(t.k[11])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[11]), 0.3, 0.5 - 0.4 * sign(t.k[11]), 0.6)
    strokeWidth : 0
  }
  t.d12 = Circle {
    center : t.pts[12]
    r : 4 + 500 * abs(t.k[12])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[12]), 0.3, 0.5 - 0.4 * sign(t.k[12]), 0.6)
    strokeWidth : 0
  }
  t.d13 = Circle {
    center : t.pts[13]
    r : 4 + 500 * abs(t.k[13])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[13]), 0.3, 0.5 - 0.4 * sign(t.k[13]), 0.6)
    strokeWidth : 0
  }
  t.d14 = Circle {
    center : t.pts[14]
    r : 4 + 500 * abs(t.k[14])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[14]), 0.3, 0.5 - 0.4 * sign(t.k[14]), 0.6)
    strokeWidth : 0
  }
  t.d15 = Circle {
    center : t.pts[15]
    r : 4 + 500 * abs(t.k[15])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[15]), 0.3, 0.5 - 0.4 * sign(t.k[15]), 0.6)
    strokeWidth : 0
  }
  t.d16 = Circle {
    center : t.pts[16]
    r : 4 + 500 * abs(t.k[16])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[16]), 0.3, 0.5 - 0.4 * sign(t.k[16]), 0.6)
    strokeWidth : 0
  }
  t.d17 = Circle {
    center : t.pts[17]
    r : 4 + 500 * abs(t.k[17])
    fillColor : rgba(0.5 + 0.4 * sign(t.k[17]), 0.3, 0.5 - 0.4 * sign(t.k[17]), 0.6)
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
