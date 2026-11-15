// layout = [place, label, place] runs the place stage twice around labelling
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

layout = [place, label, place]

forall Point p {
  p.x = ? in place
  p.y = ? in place
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
  p.text above p.icon
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
  ensure norm(a.pos - b.pos) > 120 in place
}

forall Point a; Point b; Point c
where Triangle(a, b, c) {
  encourage norm(a.pos + b.pos + c.pos) == 0 in place
}
`,
  });
  return () => stage.dispose();
};

export default mount;
