// Three predicate applications state the relations of three sets
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Set
predicate Disjoint(Set s1, Set s2)
predicate Subset (Set s1, Set s2)
`,
    substance: `Set A, B, C

Subset (A, C)
Subset (B, C)
Disjoint (A, B)

AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 2.0
    fillColor : rgba(0.4, 0.6, 0.9, 0.35)
  }
  ensure x.icon.r > 40
  ensure x.icon.r < 120
}

forall Set x {
  x.text = Text {
    string : x.label
    fontSize : "30px"
  }
  ensure contains(x.icon, x.text)
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 8.0)
  ensure disjoint(B.text, A.icon)
  A.icon above B.icon
}

forall Set A; Set B
where Disjoint(A, B) {
  ensure disjoint(A.icon, B.icon, 10.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
