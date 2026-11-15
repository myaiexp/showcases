// near: shapes moved onto each other
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
  x.icon = Rectangle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (-120, 0)
    width: 160
    height: 100
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 45
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

`,
    variants: [
      {
        label: 'No objective',
      },
      {
        label: 'near(b, a)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Rectangle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (-120, 0)
    width: 160
    height: 100
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 45
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage near(b.icon, a.icon)
}
`,
      },
      {
        label: 'near(b, a, 150)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Rectangle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (-120, 0)
    width: 160
    height: 100
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 45
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage near(b.icon, a.icon, 150)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
