// Namespaces hold constants, selectors draw matches, collectors aggregate
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
type Element
predicate In(Element, Set)
`,
    substance: `Set S1, S2
Element a, b, c, d, e
In(a, S1)
In(b, S1)
In(c, S2)
In(d, S2)
In(e, S2)
AutoLabel S1, S2
NoLabel a, b, c, d, e
`,
    style: `-- 1. a namespace: constants
canvas {
  width = 640
  height = 400
}

look {
  dot = 13
  base = 34
  grow = 16
}

-- 2. selectors: one drawing per match
forall Set s {
  s.icon = Circle {
    r : look.base
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.6, 0.95, 0.4)
  }
  s.text = Text {
    string : s.label
    fontSize : "24px"
  }
  ensure contains(s.icon, s.text)
}

forall Element e {
  e.icon = Circle {
    r : look.dot
    strokeWidth : 0.0
    fillColor : rgba(0.15, 0.15, 0.4, 1.0)
  }
}

forall Element e; Set s
where In(e, s) {
  ensure contains(s.icon, e.icon, 4.0)
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 20.0)
}

forall Element a; Element b {
  ensure disjoint(a.icon, b.icon, 4.0)
}

-- 3. a collector: the elements of each set, counted
collect Element e into es
where In(e, s)
foreach Set s {
  override s.icon.r = look.base + look.grow * numberof es
}
`,
  });
  return () => stage.dispose();
};

export default mount;
