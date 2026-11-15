// Unit frames at every point of a sampled ellipse
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
  t.a = random(95, 150)
  t.b = random(55, 100)
  t.pts = [(0 + t.a * 1, 0 + t.b * 0), (0 + t.a * 0.901, 0 + t.b * 0.434), (0 + t.a * 0.623, 0 + t.b * 0.782), (0 + t.a * 0.223, 0 + t.b * 0.975), (0 + t.a * -0.223, 0 + t.b * 0.975), (0 + t.a * -0.623, 0 + t.b * 0.782), (0 + t.a * -0.901, 0 + t.b * 0.434), (0 + t.a * -1, 0 + t.b * 0), (0 + t.a * -0.901, 0 + t.b * -0.434), (0 + t.a * -0.623, 0 + t.b * -0.782), (0 + t.a * -0.223, 0 + t.b * -0.975), (0 + t.a * 0.223, 0 + t.b * -0.975), (0 + t.a * 0.623, 0 + t.b * -0.782), (0 + t.a * 0.901, 0 + t.b * -0.434)]
  t.T = tangentVectors(t.pts, true)
  t.N = normalVectors(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #999999
    strokeWidth : 2
  }
  t.T0 = Line {
    start : t.pts[0]
    end : t.pts[0] + 26 * t.T[0]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N0 = Line {
    start : t.pts[0]
    end : t.pts[0] + 26 * t.N[0]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T1 = Line {
    start : t.pts[1]
    end : t.pts[1] + 26 * t.T[1]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N1 = Line {
    start : t.pts[1]
    end : t.pts[1] + 26 * t.N[1]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T2 = Line {
    start : t.pts[2]
    end : t.pts[2] + 26 * t.T[2]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N2 = Line {
    start : t.pts[2]
    end : t.pts[2] + 26 * t.N[2]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T3 = Line {
    start : t.pts[3]
    end : t.pts[3] + 26 * t.T[3]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N3 = Line {
    start : t.pts[3]
    end : t.pts[3] + 26 * t.N[3]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T4 = Line {
    start : t.pts[4]
    end : t.pts[4] + 26 * t.T[4]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N4 = Line {
    start : t.pts[4]
    end : t.pts[4] + 26 * t.N[4]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T5 = Line {
    start : t.pts[5]
    end : t.pts[5] + 26 * t.T[5]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N5 = Line {
    start : t.pts[5]
    end : t.pts[5] + 26 * t.N[5]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T6 = Line {
    start : t.pts[6]
    end : t.pts[6] + 26 * t.T[6]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N6 = Line {
    start : t.pts[6]
    end : t.pts[6] + 26 * t.N[6]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T7 = Line {
    start : t.pts[7]
    end : t.pts[7] + 26 * t.T[7]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N7 = Line {
    start : t.pts[7]
    end : t.pts[7] + 26 * t.N[7]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T8 = Line {
    start : t.pts[8]
    end : t.pts[8] + 26 * t.T[8]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N8 = Line {
    start : t.pts[8]
    end : t.pts[8] + 26 * t.N[8]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T9 = Line {
    start : t.pts[9]
    end : t.pts[9] + 26 * t.T[9]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N9 = Line {
    start : t.pts[9]
    end : t.pts[9] + 26 * t.N[9]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T10 = Line {
    start : t.pts[10]
    end : t.pts[10] + 26 * t.T[10]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N10 = Line {
    start : t.pts[10]
    end : t.pts[10] + 26 * t.N[10]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T11 = Line {
    start : t.pts[11]
    end : t.pts[11] + 26 * t.T[11]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N11 = Line {
    start : t.pts[11]
    end : t.pts[11] + 26 * t.N[11]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T12 = Line {
    start : t.pts[12]
    end : t.pts[12] + 26 * t.T[12]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N12 = Line {
    start : t.pts[12]
    end : t.pts[12] + 26 * t.N[12]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.T13 = Line {
    start : t.pts[13]
    end : t.pts[13] + 26 * t.T[13]
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N13 = Line {
    start : t.pts[13]
    end : t.pts[13] + 26 * t.N[13]
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
