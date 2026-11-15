// Collection access: listof field from collection yields one number per member
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
type Element
predicate In(Element, Set)
`,
    substance: `Set Top, Bottom
Element a, b, c, d, e
In(a, Top)
In(b, Top)
In(c, Top)
In(d, Bottom)
In(e, Bottom)
AutoLabel Top, Bottom
NoLabel a, b, c, d, e
`,
    style: `canvas {
  width = 640
  height = 340
}

forall Set s {
  s.row = 60 - 120 * (match_id - 1)
}

-- the free coordinate x is the field the collector reads
forall Element e; Set s
where In(e, s) {
  e.x = ?
  e.icon = Circle {
    center : (e.x, s.row)
    r : 16
    strokeWidth : 0.0
    fillColor : rgba(0.3, 0.35, 0.5, 1.0)
  }
  ensure e.x > 0 - 270
  ensure e.x < 270
}

forall Element a; Element b {
  ensure disjoint(a.icon, b.icon, 14.0)
}

collect Element e into es
where In(e, s)
foreach Set s {
  mean = average(listof x from es)
  s.marker = Line {
    start : (mean, s.row - 34)
    end : (mean, s.row + 34)
    strokeWidth : 5.0
    strokeColor : rgba(0.9, 0.25, 0.2, 1.0)
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
