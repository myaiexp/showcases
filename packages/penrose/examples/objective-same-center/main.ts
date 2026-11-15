// sameCenter: concentric shapes
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
    center: (?, ?)
    r: 100
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Rectangle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    center: (80, 60)
    width: 120
    height: 70
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
        label: 'sameCenter(a, b)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (?, ?)
    r: 100
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Rectangle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    center: (80, 60)
    width: 120
    height: 70
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage sameCenter(a.icon, b.icon)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
