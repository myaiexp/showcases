// containsPolyPoint: a point kept inside a polygon
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
  x.icon = Polygon {
    points: [(-190, -50), (-80, -150), (110, -135), (190, -10), (90, 140), (-110, 125)]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: (-100, -40)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Circle {
    r: 9
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
  x.icon = Polygon {
    points: [(-190, -50), (-80, -150), (110, -135), (190, -10), (90, 140), (-110, 125)]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: (-100, -40)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Circle {
    r: 9
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
  encourage nearPt(b.icon, 280, 120)
  ensure containsPolyPoint(a.icon.points, b.icon.center, 0)
}
`,
      },
      {
        label: 'Padding 30',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Polygon {
    points: [(-190, -50), (-80, -150), (110, -135), (190, -10), (90, 140), (-110, 125)]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: (-100, -40)
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange x {
  x.icon = Circle {
    r: 9
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
  encourage nearPt(b.icon, 280, 120)
  ensure containsPolyPoint(a.icon.points, b.icon.center, 30)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
