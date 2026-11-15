// nonDegenerateAngle: bending a flat angle
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Blue
type Orange
type Green
`,
    substance: `Blue A
Orange B
Green C
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    r: 12
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

forall Orange x {
  x.icon = Circle {
    r: 12
    fillColor: #c46f10
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Green x {
  x.icon = Circle {
    r: 12
    fillColor: #2e8a41
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  a.arm = Line {
    start: a.icon.center
    end: b.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  b.arm = Line {
    start: b.icon.center
    end: c.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  layer a.arm below a.icon
  layer b.arm below b.icon
  encourage nearPt(a.icon, -170, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 170, 0)
}
`,
    variants: [
      {
        label: 'Only pulled into a row',
      },
      {
        label: 'nonDegenerateAngle(a, b, c)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    r: 12
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

forall Orange x {
  x.icon = Circle {
    r: 12
    fillColor: #c46f10
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Green x {
  x.icon = Circle {
    r: 12
    fillColor: #2e8a41
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  a.arm = Line {
    start: a.icon.center
    end: b.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  b.arm = Line {
    start: b.icon.center
    end: c.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  layer a.arm below a.icon
  layer b.arm below b.icon
  encourage nearPt(a.icon, -170, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 170, 0)
  encourage nonDegenerateAngle(a.icon, b.icon, c.icon)
}
`,
      },
      {
        label: 'strength 20000',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    r: 12
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

forall Orange x {
  x.icon = Circle {
    r: 12
    fillColor: #c46f10
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Green x {
  x.icon = Circle {
    r: 12
    fillColor: #2e8a41
    strokeWidth: 0
  }
  x.text = Text {
    string: nameof x
    center: (x.icon.center[0], x.icon.center[1] + 26)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  a.arm = Line {
    start: a.icon.center
    end: b.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  b.arm = Line {
    start: b.icon.center
    end: c.icon.center
    strokeWidth: 4
    strokeColor: #6b7684
  }
  layer a.arm below a.icon
  layer b.arm below b.icon
  encourage nearPt(a.icon, -170, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 170, 0)
  encourage nonDegenerateAngle(a.icon, b.icon, c.icon, 20000)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
