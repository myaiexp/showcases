// centerLabel: a label on a line or in a box
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
    start: (-200, -50)
    end: (200, 50)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Text {
    string: "a label"
    fontSize: "26px"
    fillColor: #c46f10
  }
}

forall Blue a; Orange b {
}
`,
    variants: [
      {
        label: 'Label left free',
      },
      {
        label: 'centerLabel(line, text, 1)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (-200, -50)
    end: (200, 50)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Text {
    string: "a label"
    fontSize: "26px"
    fillColor: #c46f10
  }
}

forall Blue a; Orange b {
  encourage centerLabel(a.icon, b.icon, 1)
}
`,
      },
      {
        label: 'centerLabel(line, text, 1, 60)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (-200, -50)
    end: (200, 50)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Text {
    string: "a label"
    fontSize: "26px"
    fillColor: #c46f10
  }
}

forall Blue a; Orange b {
  encourage centerLabel(a.icon, b.icon, 1, 60)
}
`,
      },
      {
        label: 'centerLabel(rectangle, text, 1)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Rectangle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (0, 0)
    width: 300
    height: 200
  }
}

forall Orange x {
  x.icon = Text {
    string: "a label"
    fontSize: "26px"
    fillColor: #c46f10
  }
}

forall Blue a; Orange b {
  encourage centerLabel(a.icon, b.icon, 1)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
