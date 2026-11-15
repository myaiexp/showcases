// pointLineDist: a point at a distance from a segment
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Blue
type Orange
`,
    substance: `Blue A
Orange B
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (-200, -40)
    end: (200, 60)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Circle {
    r: 14
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

forall Blue a; Orange b {
}
`,
    variants: [
      {
        label: 'No objective',
      },
      {
        label: 'pointLineDist(p, line, 40)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (-200, -40)
    end: (200, 60)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Circle {
    r: 14
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

forall Blue a; Orange b {
  encourage pointLineDist(b.icon.center, a.icon, 40)
}
`,
      },
      {
        label: 'pointLineDist(p, line, 120)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (-200, -40)
    end: (200, 60)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Circle {
    r: 14
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

forall Blue a; Orange b {
  encourage pointLineDist(b.icon.center, a.icon, 120)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
