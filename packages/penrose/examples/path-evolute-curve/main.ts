// The curve traced by the centres of curvature, from sampled axes
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
  t.a = random(90, 120)
  t.b = random(70, 90)
  t.pts = [(0 + t.a * 1, 0 + t.b * 0), (0 + t.a * 0.951, 0 + t.b * 0.309), (0 + t.a * 0.809, 0 + t.b * 0.588), (0 + t.a * 0.588, 0 + t.b * 0.809), (0 + t.a * 0.309, 0 + t.b * 0.951), (0 + t.a * 0, 0 + t.b * 1), (0 + t.a * -0.309, 0 + t.b * 0.951), (0 + t.a * -0.588, 0 + t.b * 0.809), (0 + t.a * -0.809, 0 + t.b * 0.588), (0 + t.a * -0.951, 0 + t.b * 0.309), (0 + t.a * -1, 0 + t.b * 0), (0 + t.a * -0.951, 0 + t.b * -0.309), (0 + t.a * -0.809, 0 + t.b * -0.588), (0 + t.a * -0.588, 0 + t.b * -0.809), (0 + t.a * -0.309, 0 + t.b * -0.951), (0 + t.a * 0, 0 + t.b * -1), (0 + t.a * 0.309, 0 + t.b * -0.951), (0 + t.a * 0.588, 0 + t.b * -0.809), (0 + t.a * 0.809, 0 + t.b * -0.588), (0 + t.a * 0.951, 0 + t.b * -0.309)]
  t.ev = evoluteCurve(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.evolute = Polygon {
    points : t.ev
    fillColor : #c0392b22
    strokeColor : #c0392b
    strokeWidth : 3
  }
  t.n0 = Line {
    start : t.pts[0]
    end : t.ev[0]
    strokeWidth : 1
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.n5 = Line {
    start : t.pts[5]
    end : t.ev[5]
    strokeWidth : 1
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.n10 = Line {
    start : t.pts[10]
    end : t.ev[10]
    strokeWidth : 1
    strokeColor : #999999
    strokeStyle : "dashed"
  }
  t.n15 = Line {
    start : t.pts[15]
    end : t.ev[15]
    strokeWidth : 1
    strokeColor : #999999
    strokeStyle : "dashed"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
