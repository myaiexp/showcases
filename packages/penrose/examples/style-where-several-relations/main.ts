// Both IsRed(s) and IsBig(s) must hold before the block runs
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate IsRed(Set)
predicate IsBig(Set)
`,
    substance: `Set A, B, C, D
IsRed(A)
IsRed(B)
IsBig(B)
IsBig(C)
AutoLabel All
`,
    style: `canvas {
  width = 640
  height = 340
}

forall Set s {
  s.icon = Circle {
    r : 36
    strokeWidth : 0.0
    fillColor : rgba(0.8, 0.8, 0.8, 1.0)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 30.0)
}

forall Set s where IsRed(s) {
  override s.icon.fillColor = rgba(0.9, 0.3, 0.25, 1.0)
}

forall Set s where IsBig(s) {
  override s.icon.r = 52
}

-- only B is red and big
forall Set s
where IsRed(s); IsBig(s) {
  s.ring = Circle {
    center : s.icon.center
    r : s.icon.r + 12
    fillColor : none()
    strokeColor : rgba(0.95, 0.75, 0.1, 1.0)
    strokeWidth : 6.0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
