// inDirection: a point at a set distance along a direction
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
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (0, 0)
    r: 40
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue x {
  x.guide = Line {
    start: (0, 0)
    end: (200, 0)
    strokeWidth: 3
    strokeColor: #6b7684
    endArrowhead: "straight"
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
  encourage inDirection(b.icon.center, a.icon.center, (1, 0), 120)
}
`,
    variants: [
      {
        label: 'direction (1, 0), offset 120',
      },
      {
        label: 'direction (1, 1), offset 150',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (0, 0)
    r: 40
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue x {
  x.guide = Line {
    start: (0, 0)
    end: (141, 141)
    strokeWidth: 3
    strokeColor: #6b7684
    endArrowhead: "straight"
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
  encourage inDirection(b.icon.center, a.icon.center, (1, 1), 150)
}
`,
      },
      {
        label: 'direction (0, -1), offset 100',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (0, 0)
    r: 40
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue x {
  x.guide = Line {
    start: (0, 0)
    end: (0, -200)
    strokeWidth: 3
    strokeColor: #6b7684
    endArrowhead: "straight"
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
  encourage inDirection(b.icon.center, a.icon.center, (0, -1), 100)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
