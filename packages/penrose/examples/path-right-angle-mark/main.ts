// A right-angle marker drawn at a sampled corner
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
  t.V = (random(-40, 40), random(-30, 30))
  t.u = unitVector(random(0, 6.28))
  t.e1 = t.V + 120 * t.u
  t.e2 = t.V + 100 * rot90(t.u)
  t.l1 = Line {
    start : t.V
    end : t.e1
    strokeWidth : 4
    strokeColor : #333333
  }
  t.l2 = Line {
    start : t.V
    end : t.e2
    strokeWidth : 4
    strokeColor : #333333
  }
  t.square = Path {
    d : orientedSquare(t.l1, t.l2, t.V, 26)
    strokeColor : #2f6fbf
    strokeWidth : 3
    fillColor : #4f8fdc44
  }
  t.far = Circle {
    center : innerPointOffset(t.V, t.e1, t.e2, 26)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.v = Circle {
    center : t.V
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
