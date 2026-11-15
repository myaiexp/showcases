// a < b, a == b and a > b read as lessThan, equal and greaterThan
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (lt: string, eq: string, gt: string, bound: string): string => `canvas {
  width = 640
  height = 340
}

forall Set s {
  s.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "24px"
  }
  ensure ${bound}
  ensure s.icon.r < 90
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 12.0)
}

forall Set x; Set y
where Smaller(x, y) {
  ensure ${lt}
}

forall Set x; Set y
where SameSize(x, y) {
  ensure ${eq}
}

forall Set x; Set y
where Larger(x, y) {
  ensure ${gt}
}
`;
  const operators = style('x.icon.r + 20 < y.icon.r', 'x.icon.r == y.icon.r', 'x.icon.r > y.icon.r + 20', 's.icon.r > 25');
  playground(stage, {
    domain: `type Set
predicate Smaller(Set, Set)
predicate SameSize(Set, Set)
predicate Larger(Set, Set)
`,
    substance: `Set Small, Medium, Twin, Big
Smaller(Small, Medium)
SameSize(Medium, Twin)
Larger(Big, Medium)
AutoLabel All
`,
    style: operators,
    variants: [
      { label: 'operators < == >', style: operators },
      {
        label: 'function calls',
        style: style('lessThan(x.icon.r + 20, y.icon.r)', 'equal(x.icon.r, y.icon.r)', 'greaterThan(x.icon.r, y.icon.r + 20)', 'greaterThan(s.icon.r, 25)'),
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
