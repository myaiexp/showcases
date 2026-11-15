// Six mappings of x and y are tried; the two that satisfy Subset draw arrows
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Subset(Set, Set)
`,
    substance: `Set A, B, C
Subset(A, B)
Subset(B, C)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 400
}

forall Set s {
  s.icon = Circle {
    r : 42
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.55)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "30px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 90.0)
}

-- runs for (x, y) = (A, B) and (B, C) only
forall Set x; Set y
where Subset(x, y) {
  arrow = Line {
    start : x.icon.center
    end : y.icon.center
    strokeWidth : 4.0
    strokeColor : rgba(0.85, 0.25, 0.2, 1.0)
    endArrowhead : "straight"
  }
  layer arrow below x.icon
  layer arrow below y.icon
}
`,
  });
  return () => stage.dispose();
};

export default mount;
