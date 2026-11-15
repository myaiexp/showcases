// [a, b] is a list of shapes, which Group accepts as its members
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Pair(Set, Set)
`,
    substance: `Set A, B, C, D
Pair(A, B)
Pair(C, D)
AutoLabel All
`,
    style: `canvas {
  width = 620
  height = 380
}

forall Set s {
  s.icon = Circle {
    r : 34
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "24px"
  }
}

forall Set x; Set y
where Pair(x, y) as p {
  ensure vdist(x.icon.center, y.icon.center) == 90.0
  p.both = Group {
    shapes : [x.icon, y.icon]
  }
}

-- the whole pair moves as one thing for this constraint
forall Set a; Set b; Set c; Set d
where Pair(a, b) as p1; Pair(c, d) as p2 {
  ensure disjoint(p1.both, p2.both, 40.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
