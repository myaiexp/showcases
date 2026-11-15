// collinear: three points on one line
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
    substance: `Pt A, B, C
Arm(A, B)
Arm(B, C)
Rule(A, B, C)
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
        label: 'Points left free',
      },
      {
        label: 'collinear(a, b, c)',
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

forall Pt a; Pt b; Pt c
where Rule(a, b, c) {
  ensure collinear(a.icon.center, b.icon.center, c.icon.center)
  ensure vdist(a.icon.center, c.icon.center) > 110
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
