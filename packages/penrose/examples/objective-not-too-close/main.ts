// notTooClose: keeping two shapes apart
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
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
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

forall Blue a; Orange b {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
}
`,
    variants: [
      {
        label: 'Only pulled together',
      },
      {
        label: 'notTooClose(a, b)',
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
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
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

forall Blue a; Orange b {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage notTooClose(a.icon, b.icon)
}
`,
      },
      {
        label: 'notTooClose(a, b, 1000)',
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
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
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

forall Blue a; Orange b {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage notTooClose(a.icon, b.icon, 1000)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
