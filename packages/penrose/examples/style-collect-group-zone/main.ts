// Collected shapes become a Group, so one constraint covers every member
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
type Element
predicate In(Element, Set)
predicate Special(Set)
predicate Plain(Set)
`,
    substance: `Set S1, S2, S3
Element a, b, c, d, e, f
In(a, S1)
In(b, S1)
In(c, S2)
In(d, S2)
In(e, S3)
In(f, S3)
Special(S1)
Special(S2)
Plain(S3)
NoLabel a, b, c, d, e, f
`,
    style: `canvas {
  width = 640
  height = 360
}

zone {
  box = Rectangle {
    center : (150, 0)
    width : 280
    height : 280
    fillColor : rgba(0.6, 0.85, 0.6, 0.35)
    strokeColor : rgba(0.2, 0.55, 0.25, 1.0)
    strokeWidth : 3.0
  }
}

forall Element e {
  e.icon = Circle {
    r : 15
    strokeWidth : 0.0
    fillColor : rgba(0.3, 0.35, 0.55, 1.0)
  }
}

forall Element a; Element b {
  ensure disjoint(a.icon, b.icon, 10.0)
}

-- members of Plain sets stay outside the zone
forall Element e; Set s
where In(e, s); Plain(s) {
  ensure disjoint(zone.box, e.icon, 10.0)
}

-- members of Special sets, collected together, must all fit inside it
collect Element e into es
where In(e, s); Special(s)
with Set s {
  members = Group {
    shapes : listof icon from es
  }
  ensure contains(zone.box, members, 10.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
