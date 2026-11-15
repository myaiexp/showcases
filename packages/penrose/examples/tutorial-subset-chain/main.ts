// Tutorial 2: the Subset predicate drawn as nested circles with contains and above
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'style',
    domain: `type Set
predicate Subset(Set s1, Set s2)
`,
    substance: `Set A, B, C
Subset(B, A)
Subset(C, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 5.0)
  A.icon above B.icon
}
forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.4, 0.6, 0.9, 0.5)
  }
  ensure x.icon.r > 25
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
  ensure disjoint(B.text, A.icon)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
