// distributeHorizontally: a row with fixed gaps
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Blue
type Orange
type Green
`,
    substance: `Blue A
Orange B
Green C
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
    r: 40
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

forall Green x {
  x.icon = Circle {
    fillColor: #58b96a66
    strokeColor: #2e8a41
    strokeWidth: 3
    r: 35
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 0, 0)
}
`,
    variants: [
      {
        label: 'Only pulled together',
      },
      {
        label: 'padding 20',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    r: 40
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

forall Green x {
  x.icon = Circle {
    fillColor: #58b96a66
    strokeColor: #2e8a41
    strokeWidth: 3
    r: 35
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 0, 0)
  ensure distributeHorizontally([a.icon, b.icon, c.icon], 20)
}
`,
      },
      {
        label: 'padding 60',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    r: 40
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

forall Green x {
  x.icon = Circle {
    fillColor: #58b96a66
    strokeColor: #2e8a41
    strokeWidth: 3
    r: 35
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 0, 0)
  ensure distributeHorizontally([a.icon, b.icon, c.icon], 60)
}
`,
      },
      {
        label: 'leftToRight = false',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
    r: 40
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

forall Green x {
  x.icon = Circle {
    fillColor: #58b96a66
    strokeColor: #2e8a41
    strokeWidth: 3
    r: 35
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Blue a; Orange b; Green c {
  encourage nearPt(a.icon, 0, 0)
  encourage nearPt(b.icon, 0, 0)
  encourage nearPt(c.icon, 0, 0)
  ensure distributeHorizontally([a.icon, b.icon, c.icon], 20, false)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
