// Declare-then-assign, declare-and-assign and Let build the same segment
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    variants: [
      {
        label: 's := Segment(A, B)',

      },
      {
        label: 'Segment s := …',
        substance: `Point A, B
Segment s := Segment(A, B)
AutoLabel All
`,
      },
      {
        label: 'Let s := …',
        substance: `Point A, B
Let s := Segment(A, B)
AutoLabel All
`,
      },
    ],
    domain: `type Point
type Segment
constructor Segment(Point p, Point q)
`,
    substance: `Point A, B
Segment s
s := Segment(A, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Point p {
  p.icon = Circle {
    r : 16
    fillColor : #3b6fd4
    strokeWidth : 0
  }
  p.text = Text {
    string : p.label
    fontSize : "30px"
  }
  ensure vdist(p.icon.center, p.text.center) == 36.0
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
  ensure vdist(p.icon.center, q.icon.center) > 180
}
`,
  });
  return () => stage.dispose();
};

export default mount;
