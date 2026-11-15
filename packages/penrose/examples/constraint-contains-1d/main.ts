// contains1D: one interval inside another
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
    start: (?, 70)
    end: (?, 70)
    strokeWidth: 14
    strokeColor: #2f6fbf
  }
  x.text = Text {
    string: nameof x
    center: ((x.icon.start[0] + x.icon.end[0]) / 2, 105)
    fontSize: "20px"
  }
}

forall Orange x {
  x.icon = Line {
    start: (-100, -70)
    end: (100, -70)
    strokeWidth: 14
    strokeColor: #c46f10
  }
  x.text = Text {
    string: nameof x
    center: (0, -105)
    fontSize: "20px"
  }
}

forall Blue a; Orange b {
  encourage equal(a.icon.start[0], -250)
  encourage equal(a.icon.end[0], 250)
}
`,
    variants: [
      {
        label: 'Only a pull outward',
      },
      {
        label: 'contains1D(b, a)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (?, 70)
    end: (?, 70)
    strokeWidth: 14
    strokeColor: #2f6fbf
  }
  x.text = Text {
    string: nameof x
    center: ((x.icon.start[0] + x.icon.end[0]) / 2, 105)
    fontSize: "20px"
  }
}

forall Orange x {
  x.icon = Line {
    start: (-100, -70)
    end: (100, -70)
    strokeWidth: 14
    strokeColor: #c46f10
  }
  x.text = Text {
    string: nameof x
    center: (0, -105)
    fontSize: "20px"
  }
}

forall Blue a; Orange b {
  encourage equal(a.icon.start[0], -250)
  encourage equal(a.icon.end[0], 250)
  ensure contains1D((b.icon.start[0], b.icon.end[0]), (a.icon.start[0], a.icon.end[0]))
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
