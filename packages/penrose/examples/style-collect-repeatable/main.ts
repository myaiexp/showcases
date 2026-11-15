// Collectors skip a == s unless the repeatable keyword is written
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (keyword: string): string => `canvas {
  width = 560
  height = 380
}

forall Set s {
  s.icon = Circle {
    r : 28
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
where Subset(x, y) {
  ensure contains(y.icon, x.icon, 8.0)
  ensure disjoint(y.text, x.icon, 4.0)
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 10.0)
}

-- how many sets does a hold? B holds A, C and, if repeatable, itself
collect ${keyword}Set s into ss
where Subset(s, a)
foreach Set a {
  override a.icon.r = 40 + 28 * numberof ss
  override a.icon.fillColor = rgba(0.95, 0.75, 0.3, 0.45)
}
`;
  playground(stage, {
    domain: `type Set
predicate Subset(Set, Set)
`,
    substance: `Set A, B, C
Subset(A, B)
Subset(B, B)
Subset(C, B)
AutoLabel All
`,
    style: style(''),
    variants: [
      { label: 'collect (skips B, B)', style: style('') },
      { label: 'collect repeatable', style: style('repeatable ') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
