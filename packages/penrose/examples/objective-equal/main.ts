// equal: making two values meet
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
    center: (-150, ?)
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 30
  ensure x.icon.r < 110
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    center: (150, 80)
    r: 70
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
        label: 'equal(a.r, b.r)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (-150, ?)
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 30
  ensure x.icon.r < 110
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    center: (150, 80)
    r: 70
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage equal(a.icon.r, b.icon.r)
}
`,
      },
      {
        label: 'equal(a.y, b.y)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (-150, ?)
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 30
  ensure x.icon.r < 110
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    center: (150, 80)
    r: 70
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage equal(a.icon.center[1], b.icon.center[1])
}
`,
      },
      {
        label: 'Sugar: a.r == b.r',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    center: (-150, ?)
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 30
  ensure x.icon.r < 110
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    center: (150, 80)
    r: 70
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b {
  encourage a.icon.r == b.icon.r
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
