// maximal: pushing a value up as far as it goes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Blue
`,
    substance: `Blue A
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
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 25
  ensure x.icon.r < 90
}

`,
    variants: [
      {
        label: 'No objective',
      },
      {
        label: 'maximal(x)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 25
  ensure x.icon.r < 90
}

forall Blue a {
  encourage maximal(a.icon.center[0])
}
`,
      },
      {
        label: 'maximal(y)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 25
  ensure x.icon.r < 90
}

forall Blue a {
  encourage maximal(a.icon.center[1])
}
`,
      },
      {
        label: 'maximal(r)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Circle {
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 3
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
  ensure x.icon.r > 25
  ensure x.icon.r < 90
}

forall Blue a {
  encourage maximal(a.icon.r)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
