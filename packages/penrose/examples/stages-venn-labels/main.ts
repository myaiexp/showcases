// Nested set circles solved first, then each label centred in its circle
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
predicate Subset(Set a, Set b)
predicate Disjoint(Set a, Set b)
`,
    substance: `Set A, B, C
Subset(A, B)
Disjoint(B, C)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

layout = [shape, label]

forall Set s {
  s.icon = Circle {
    strokeWidth : 3
    strokeColor : #1a3a6b
    fillColor : rgba(0.75, 0.85, 1.0, 0.5)
  }
  s.text = Text {
    string : s.label
    fontSize : "28px"
    center : (? in label, ? in label)
  }
  ensure s.icon.r > 40 in shape
  ensure s.icon.r < 150 in shape
  ensure contains(s.icon, s.text, 6) in label
  encourage norm(s.text.center - s.icon.center) == 0 in label
}

forall Set a; Set b
where Subset(a, b) {
  ensure contains(b.icon, a.icon, 14) in shape
  ensure b.icon.r > a.icon.r + 30 in shape
}

forall Set a; Set b
where Disjoint(a, b) {
  ensure disjoint(a.icon, b.icon, 12) in shape
}
`,
  });
  return () => stage.dispose();
};

export default mount;
