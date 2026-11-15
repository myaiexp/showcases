// lessThan: a soft upper bound
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
    center: (?, 0)
    r: 40
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
}

forall Orange x {
  x.icon = Rectangle {
    center: (0, 0)
    width: 6
    height: 400
    fillColor: #6b7684
    strokeWidth: 0
  }
}

forall Blue a {
  encourage nearPt(a.icon, 200, 0)
}
`,
    variants: [
      {
        label: 'Only a pull to x = 200',
      },
      {
        label: 'lessThan(x, 0)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    center: (?, 0)
    r: 40
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
}

forall Orange x {
  x.icon = Rectangle {
    center: (0, 0)
    width: 6
    height: 400
    fillColor: #6b7684
    strokeWidth: 0
  }
}

forall Blue a {
  encourage nearPt(a.icon, 200, 0)
  encourage lessThan(a.icon.center[0], 0)
}
`,
      },
      {
        label: 'Sugar: a.x < 0',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    center: (?, 0)
    r: 40
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
}

forall Orange x {
  x.icon = Rectangle {
    center: (0, 0)
    width: 6
    height: 400
    fillColor: #6b7684
    strokeWidth: 0
  }
}

forall Blue a {
  encourage nearPt(a.icon, 200, 0)
  encourage a.icon.center[0] < 0
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
