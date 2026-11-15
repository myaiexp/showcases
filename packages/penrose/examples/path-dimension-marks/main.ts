// An offset measuring line with end caps for a sampled segment
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
  t.A = (random(-140, -80), random(-50, 20))
  t.B = (random(80, 140), random(-50, 20))
  t.dir = normalize(t.B - t.A)
  t.base = Line {
    start : t.A
    end : t.B
    strokeWidth : 5
    strokeColor : #333333
  }
  t.side = Line {
    start : t.A
    end : t.A + 50 * rot90(t.dir)
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.mark = unitMark(t.base, t.side, 38)
  t.dim = Polyline {
    points : t.mark
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.capA = Polyline {
    points : unitMark2(t.mark, "start", 9)
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.capB = Polyline {
    points : unitMark2(t.mark, "end", 9)
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.extA = Line {
    start : t.A
    end : t.mark[0]
    strokeWidth : 1
    strokeColor : #e0b0aa
  }
  t.extB = Line {
    start : t.B
    end : t.mark[1]
    strokeWidth : 1
    strokeColor : #e0b0aa
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
