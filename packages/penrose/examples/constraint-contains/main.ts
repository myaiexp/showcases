// contains: one shape inside another
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
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 50
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
        label: 'Circle contains circle',
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
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 50
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
  ensure contains(a.icon, b.icon, 20)
}
`,
      },
      {
        label: 'Rectangle contains circle',
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
    width: 360
    height: 280
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
    r: 50
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
  ensure contains(a.icon, b.icon, 20)
}
`,
      },
      {
        label: 'Polygon contains circle',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.text = Text {
    string: nameof x
    center: (-100, -60)
    fontSize: "20px"
  }
  x.icon = Polygon {
    points: [(-190, -50), (-80, -150), (110, -135), (190, -10), (90, 140), (-110, 125)]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 50
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
  ensure contains(a.icon, b.icon, 20)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
