// nearPt: sending a shape to a point
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
    r: 55
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
    width: 140
    height: 90
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
        label: 'nearPt(a, -180, 100), nearPt(b, 160, -90)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    r: 55
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
    width: 140
    height: 90
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage nearPt(a.icon, -180, 100)
  encourage nearPt(b.icon, 160, -90)
}
`,
      },
      {
        label: 'nearPt(a, 150, 100), nearPt(b, -160, -90)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    r: 55
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
    width: 140
    height: 90
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage nearPt(a.icon, 150, 100)
  encourage nearPt(b.icon, -160, -90)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
