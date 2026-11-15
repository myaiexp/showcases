// centerLabelAbove: a label over the middle of a line
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
  x.icon = Line {
    start: (-200, -50)
    end: (200, 50)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Text {
    string: "a label"
    fontSize: "26px"
    fillColor: #c46f10
  }
}

forall Blue a; Orange b {
}
`,
    variants: [
      {
        label: 'Label left free',
      },
      {
        label: 'centerLabelAbove(line, text, 1)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (-200, -50)
    end: (200, 50)
    strokeWidth: 6
    strokeColor: #2f6fbf
  }
}

forall Orange x {
  x.icon = Text {
    string: "a label"
    fontSize: "26px"
    fillColor: #c46f10
  }
}

forall Blue a; Orange b {
  encourage centerLabelAbove(a.icon, b.icon, 1)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
