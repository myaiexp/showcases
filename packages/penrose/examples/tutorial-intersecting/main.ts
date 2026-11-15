// Exercise: an Intersecting predicate drawn as two overlapping circles
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Intersecting(Set s1, Set s2)
`,
    substance: `Set A, B
Intersecting(A, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.9, 0.5, 0.3, 0.5)
  }
  ensure x.icon.r > 60
  ensure x.icon.r < 130
}

forall Set x {
  x.text = Text {
    string : x.label
    fontSize : "30px"
  }
  ensure contains(x.icon, x.text)
  layer x.text above x.icon
}

forall Set A; Set B
where Intersecting(A, B) {
  ensure overlapping(A.icon, B.icon)
  ensure disjoint(A.text, B.icon)
  ensure disjoint(B.text, A.icon)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
