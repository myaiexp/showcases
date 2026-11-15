// A wobbly closed curve pushed along its normals by a sampled distance
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
  t.d = random(10, 30)
  t.pts = [(1 * 112, 0 * 75), (0.966 * 105.556, 0.259 * 70.607), (0.866 * 90, 0.5 * 60), (0.707 * 74.444, 0.707 * 49.393), (0.5 * 68, 0.866 * 45), (0.259 * 74.444, 0.966 * 49.393), (0 * 90, 1 * 60), (-0.259 * 105.556, 0.966 * 70.607), (-0.5 * 112, 0.866 * 75), (-0.707 * 105.556, 0.707 * 70.607), (-0.866 * 90, 0.5 * 60), (-0.966 * 74.444, 0.259 * 49.393), (-1 * 68, 0 * 45), (-0.966 * 74.444, -0.259 * 49.393), (-0.866 * 90, -0.5 * 60), (-0.707 * 105.556, -0.707 * 70.607), (-0.5 * 112, -0.866 * 75), (-0.259 * 105.556, -0.966 * 70.607), (0 * 90, -1 * 60), (0.259 * 74.444, -0.966 * 49.393), (0.5 * 68, -0.866 * 45), (0.707 * 74.444, -0.707 * 49.393), (0.866 * 90, -0.5 * 60), (0.966 * 105.556, -0.259 * 70.607)]
  t.inner = offsetCurve(t.pts, true, t.d)
  t.outer = offsetCurve(t.pts, true, -t.d)
  t.base = Polygon {
    points : t.pts
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.shrunk = Polygon {
    points : t.inner
    fillColor : none()
    strokeColor : #c0392b
    strokeWidth : 2
  }
  t.grown = Polygon {
    points : t.outer
    fillColor : none()
    strokeColor : #2e8b57
    strokeWidth : 2
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
