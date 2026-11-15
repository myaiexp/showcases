// Tangent, normal and binormal arrows on a projected 3D helix
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
  t.r = random(40, 65)
  t.pts = [(t.r * 1, t.r * 0, -110), (t.r * 0.697, t.r * 0.717, -93), (t.r * -0.029, t.r * 1, -76), (t.r * -0.737, t.r * 0.675, -59), (t.r * -0.998, t.r * -0.058, -42), (t.r * -0.654, t.r * -0.757, -25), (t.r * 0.087, t.r * -0.996, -8), (t.r * 0.776, t.r * -0.631, 9), (t.r * 0.993, t.r * 0.117, 26), (t.r * 0.608, t.r * 0.794, 43), (t.r * -0.146, t.r * 0.989, 60), (t.r * -0.811, t.r * 0.585, 77), (t.r * -0.985, t.r * -0.174, 94)]
  t.T = tangentVectors(t.pts, false)
  t.N = normalVectors(t.pts, false)
  t.B = binormalVectors(t.pts, false)
  t.flat = [(t.pts[0][0], 0.5 * t.pts[0][1] + t.pts[0][2] - 20), (t.pts[1][0], 0.5 * t.pts[1][1] + t.pts[1][2] - 20), (t.pts[2][0], 0.5 * t.pts[2][1] + t.pts[2][2] - 20), (t.pts[3][0], 0.5 * t.pts[3][1] + t.pts[3][2] - 20), (t.pts[4][0], 0.5 * t.pts[4][1] + t.pts[4][2] - 20), (t.pts[5][0], 0.5 * t.pts[5][1] + t.pts[5][2] - 20), (t.pts[6][0], 0.5 * t.pts[6][1] + t.pts[6][2] - 20), (t.pts[7][0], 0.5 * t.pts[7][1] + t.pts[7][2] - 20), (t.pts[8][0], 0.5 * t.pts[8][1] + t.pts[8][2] - 20), (t.pts[9][0], 0.5 * t.pts[9][1] + t.pts[9][2] - 20), (t.pts[10][0], 0.5 * t.pts[10][1] + t.pts[10][2] - 20), (t.pts[11][0], 0.5 * t.pts[11][1] + t.pts[11][2] - 20), (t.pts[12][0], 0.5 * t.pts[12][1] + t.pts[12][2] - 20)]
  t.helix = Polyline {
    points : t.flat
    strokeColor : #999999
    strokeWidth : 3
    fillColor : none()
  }
  t.T2 = Line {
    start : t.flat[2]
    end : (t.flat[2][0] + 30 * t.T[2][0], t.flat[2][1] + 30 * (0.5 * t.T[2][1] + t.T[2][2]))
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N2 = Line {
    start : t.flat[2]
    end : (t.flat[2][0] + 30 * t.N[2][0], t.flat[2][1] + 30 * (0.5 * t.N[2][1] + t.N[2][2]))
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.B2 = Line {
    start : t.flat[2]
    end : (t.flat[2][0] + 30 * t.B[2][0], t.flat[2][1] + 30 * (0.5 * t.B[2][1] + t.B[2][2]))
    strokeWidth : 3
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.p2 = Circle {
    center : t.flat[2]
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
  t.T4 = Line {
    start : t.flat[4]
    end : (t.flat[4][0] + 30 * t.T[4][0], t.flat[4][1] + 30 * (0.5 * t.T[4][1] + t.T[4][2]))
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N4 = Line {
    start : t.flat[4]
    end : (t.flat[4][0] + 30 * t.N[4][0], t.flat[4][1] + 30 * (0.5 * t.N[4][1] + t.N[4][2]))
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.B4 = Line {
    start : t.flat[4]
    end : (t.flat[4][0] + 30 * t.B[4][0], t.flat[4][1] + 30 * (0.5 * t.B[4][1] + t.B[4][2]))
    strokeWidth : 3
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.p4 = Circle {
    center : t.flat[4]
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
  t.T6 = Line {
    start : t.flat[6]
    end : (t.flat[6][0] + 30 * t.T[6][0], t.flat[6][1] + 30 * (0.5 * t.T[6][1] + t.T[6][2]))
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N6 = Line {
    start : t.flat[6]
    end : (t.flat[6][0] + 30 * t.N[6][0], t.flat[6][1] + 30 * (0.5 * t.N[6][1] + t.N[6][2]))
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.B6 = Line {
    start : t.flat[6]
    end : (t.flat[6][0] + 30 * t.B[6][0], t.flat[6][1] + 30 * (0.5 * t.B[6][1] + t.B[6][2]))
    strokeWidth : 3
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.p6 = Circle {
    center : t.flat[6]
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
  t.T8 = Line {
    start : t.flat[8]
    end : (t.flat[8][0] + 30 * t.T[8][0], t.flat[8][1] + 30 * (0.5 * t.T[8][1] + t.T[8][2]))
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N8 = Line {
    start : t.flat[8]
    end : (t.flat[8][0] + 30 * t.N[8][0], t.flat[8][1] + 30 * (0.5 * t.N[8][1] + t.N[8][2]))
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.B8 = Line {
    start : t.flat[8]
    end : (t.flat[8][0] + 30 * t.B[8][0], t.flat[8][1] + 30 * (0.5 * t.B[8][1] + t.B[8][2]))
    strokeWidth : 3
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.p8 = Circle {
    center : t.flat[8]
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
  t.T10 = Line {
    start : t.flat[10]
    end : (t.flat[10][0] + 30 * t.T[10][0], t.flat[10][1] + 30 * (0.5 * t.T[10][1] + t.T[10][2]))
    strokeWidth : 3
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.N10 = Line {
    start : t.flat[10]
    end : (t.flat[10][0] + 30 * t.N[10][0], t.flat[10][1] + 30 * (0.5 * t.N[10][1] + t.N[10][2]))
    strokeWidth : 3
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.B10 = Line {
    start : t.flat[10]
    end : (t.flat[10][0] + 30 * t.B[10][0], t.flat[10][1] + 30 * (0.5 * t.B[10][1] + t.B[10][2]))
    strokeWidth : 3
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.p10 = Circle {
    center : t.flat[10]
    r : 4
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
