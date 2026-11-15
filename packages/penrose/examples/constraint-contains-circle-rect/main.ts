// containsCircleRect: a rectangle kept inside a circle
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
    r: 150
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
  encourage nearPt(b.icon, 280, 120)
}
`,
    variants: [
      {
        label: 'Only a pull outward',
      },
      {
        label: 'No padding',
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
    r: 150
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
  encourage nearPt(b.icon, 280, 120)
  ensure containsCircleRect(a.icon.center, a.icon.r, bboxPts(b.icon), 0)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
