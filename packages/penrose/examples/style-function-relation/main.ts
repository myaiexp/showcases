// where u := Union(a, b) matches the set that Substance builds with Union
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
function Union(Set, Set) -> Set
`,
    substance: `Set A, B
Set U := Union(A, B)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 400
}

forall Set s {
  s.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.55, 0.7, 0.95, 0.5)
  }
  ensure s.icon.r > 40
  ensure s.icon.r < 190
  s.text = Text {
    string : s.label
    fontSize : "28px"
  }
  ensure contains(s.icon, s.text)
}

forall Set u; Set a; Set b
where u := Union(a, b) {
  ensure contains(u.icon, a.icon, 6.0)
  ensure contains(u.icon, b.icon, 6.0)
  ensure disjoint(a.icon, b.icon, 10.0)
  ensure disjoint(u.text, a.icon, 4.0)
  ensure disjoint(u.text, b.icon, 4.0)
  override u.icon.fillColor = rgba(0.95, 0.75, 0.3, 0.4)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
