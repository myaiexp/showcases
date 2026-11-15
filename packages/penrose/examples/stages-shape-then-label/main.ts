// layout = [shape, label] lays out points first, then moves only the labels
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Point
predicate Edge(Point a, Point b)
predicate Triangle(Point a, Point b, Point c)
`,
    substance: `Point A, B, C
Edge(A, B)
Edge(B, C)
Edge(C, A)
Triangle(A, B, C)
AutoLabel All
`,
    style: `canvas {
  width = 400
  height = 300
}

layout = [shape, label]

forall Point p {
  p.x = ? in shape
  p.y = ? in shape
  p.pos = (p.x, p.y)
  p.icon = Circle {
    center : p.pos
    r : 7
    fillColor : #222222
  }
  p.text = Text {
    string : p.label
    fontSize : "24px"
    center : (? in label, ? in label)
    fillColor : #c0392b
  }
  ensure norm(p.text.center - p.pos) == 26 in label
}

forall Point a; Point b
where Edge(a, b) {
  edge = Line {
    start : a.pos
    end : b.pos
    strokeWidth : 2
    strokeColor : #555555
  }
  edge below a.icon
  edge below b.icon
  ensure norm(a.pos - b.pos) > 120 in shape
}
`,
  });
  return () => stage.dispose();
};

export default mount;
