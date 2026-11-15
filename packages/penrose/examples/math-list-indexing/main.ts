// Picking items of a sampled list by index
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
  t.pts = [(-150, random(-100, 100)), (-75, random(-100, 100)), (0, random(-100, 100)), (75, random(-100, 100)), (150, random(-100, 100))]
  t.xs = [t.pts[0][0], t.pts[1][0], t.pts[2][0], t.pts[3][0], t.pts[4][0]]
  t.centroid = sumVectors(t.pts) / count(t.xs)
  t.line = Polyline {
    points : t.pts
    strokeColor : #777777
    strokeWidth : 3
    fillColor : none()
  }
  t.first = Circle {
    center : oneBasedElement(t.pts, 1)
    r : 12
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.second = Circle {
    center : t.pts[1]
    r : 12
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.vertical = Line {
    start : (get(t.xs, 3), -140)
    end : (get(t.xs, 3), 140)
    strokeWidth : 2
    strokeColor : #2e8b57
    strokeStyle : "dashed"
  }
  t.mean = Circle {
    center : t.centroid
    r : 9
    fillColor : #e08a1e
    strokeWidth : 0
  }
  t.l1 = Text {
    string : "oneBasedElement"
    center : (-60, 130)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "pts[1]"
    center : (-60, 108)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l3 = Text {
    string : "get(xs, 3)"
    center : (110, 130)
    fontSize : "18px"
    fillColor : #2e8b57
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
