// Exercise: a Disjoint predicate keeps two circles apart
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Disjoint(Set s1, Set s2)
`,
    substance: `Set A, B
Disjoint(A, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.3, 0.7, 0.5, 0.5)
  }
  ensure x.icon.r > 50
  ensure x.icon.r < 110
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
where Disjoint(A, B) {
  ensure disjoint(A.icon, B.icon, 30.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
