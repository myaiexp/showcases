// Double-dash comments in Domain and Substance programs
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    domain: `-- Euler diagrams: sets drawn as circles
type Set -- the only type

-- relations between two sets
predicate Disjoint(Set s1, Set s2)
predicate Intersecting (Set s1, Set s2)
predicate Subset (Set s1, Set s2)
`,
    substance: `-- three sets
Set A, B, C

-- A and B live inside C and do not touch
Subset (A, C)
Subset (B, C)
Disjoint (A, B)

AutoLabel All -- names become labels
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
  x.text = Text {
    string : x.label
    fontSize : "30px"
  }
  ensure x.icon.r > 30
  ensure x.icon.r < 170
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
