// A constructor with an omitted output type and the Let keyword that calls it
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    domain: `type Point
type Segment
-- the output type may be left out when it is the constructor's own name
constructor Segment(Point p, Point q)
`,
    substance: `Point A, B, C
Let s := Segment(A, B)
Let t := Segment(B, C)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Point p {
  p.icon = Circle {
    r : 14
    fillColor : #3b6fd4
    strokeWidth : 0
  }
  p.text = Text {
    string : p.label
    fontSize : "30px"
  }
  ensure vdist(p.icon.center, p.text.center) == 34.0
}

forall Segment s; Point p; Point q
where s := Segment(p, q) {
  s.line = Line {
    start : p.icon.center
    end : q.icon.center
    strokeWidth : 5.0
    strokeColor : #555555
  }
  layer s.line below p.icon
  layer s.line below q.icon
  ensure vdist(p.icon.center, q.icon.center) > 140
}
`,
  });
  return () => stage.dispose();
};

export default mount;
