// perpendicular: a right angle at a vertex
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Pt
predicate Arm(Pt a, Pt b)
predicate Rule(Pt a, Pt b, Pt c)
`,
    substance: `Pt P, Q, R
Arm(P, Q)
Arm(P, R)
Rule(Q, P, R)
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Pt x {
  x.icon = Circle {
    r: 9
    fillColor: #2f6fbf
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Pt a; Pt b
where Arm(a, b) {
  b.arm = Line {
    start: a.icon.center
    end: b.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  layer b.arm below a.icon
  layer b.arm below b.icon
  ensure vdist(a.icon.center, b.icon.center) > 110
  ensure vdist(a.icon.center, b.icon.center) < 230
}

`,
    variants: [
      {
        label: 'Angle left free',
      },
      {
        label: 'perpendicular(q, p, r)',
        style: `canvas {
  width = 600
  height = 450
}

forall Pt x {
  x.icon = Circle {
    r: 9
    fillColor: #2f6fbf
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Pt a; Pt b
where Arm(a, b) {
  b.arm = Line {
    start: a.icon.center
    end: b.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  layer b.arm below a.icon
  layer b.arm below b.icon
  ensure vdist(a.icon.center, b.icon.center) > 110
  ensure vdist(a.icon.center, b.icon.center) < 230
}

forall Pt q; Pt p; Pt r
where Rule(q, p, r) {
  ensure perpendicular(q.icon.center, p.icon.center, r.icon.center)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
