// A where clause restricts a block to the related pair; the third set is unconstrained
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Subset(Set s1, Set s2)
`,
    substance: `Set A, B, C
Subset(A, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.5, 0.5, 0.9, 0.5)
  }
  ensure x.icon.r > 35
  ensure x.icon.r < 130
  x.text = Text {
    string : x.label
    fontSize : "30px"
  }
  ensure contains(x.icon, x.text)
}

forall Set A; Set B
where Subset(A, B) {
  ensure contains(B.icon, A.icon, 5.0)
  A.icon above B.icon
  ensure disjoint(B.text, A.icon)
  -- only the matched pair turns orange
  override A.icon.fillColor = rgba(0.95, 0.6, 0.2, 0.7)
  override B.icon.fillColor = rgba(0.95, 0.8, 0.4, 0.4)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
