// disjointIntervals: two lines that share no x range
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
    start: (?, 60)
    end: (?, 60)
    strokeWidth: 14
    strokeColor: #2f6fbf
  }
  x.text = Text {
    string: nameof x
    center: ((x.icon.start[0] + x.icon.end[0]) / 2, 95)
    fontSize: "20px"
  }
  ensure x.icon.end[0] - x.icon.start[0] > 130
}

forall Orange x {
  x.icon = Line {
    start: (?, -60)
    end: (?, -60)
    strokeWidth: 14
    strokeColor: #c46f10
  }
  x.text = Text {
    string: nameof x
    center: ((x.icon.start[0] + x.icon.end[0]) / 2, -95)
    fontSize: "20px"
  }
  ensure x.icon.end[0] - x.icon.start[0] > 130
}

forall Blue a; Orange b {
  encourage equal(a.icon.start[0], -150)
  encourage equal(a.icon.end[0], 150)
  encourage equal(b.icon.start[0], -150)
  encourage equal(b.icon.end[0], 150)
}
`,
    variants: [
      {
        label: 'Only pulled together',
      },
      {
        label: 'disjointIntervals(a, b)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Line {
    start: (?, 60)
    end: (?, 60)
    strokeWidth: 14
    strokeColor: #2f6fbf
  }
  x.text = Text {
    string: nameof x
    center: ((x.icon.start[0] + x.icon.end[0]) / 2, 95)
    fontSize: "20px"
  }
  ensure x.icon.end[0] - x.icon.start[0] > 130
}

forall Orange x {
  x.icon = Line {
    start: (?, -60)
    end: (?, -60)
    strokeWidth: 14
    strokeColor: #c46f10
  }
  x.text = Text {
    string: nameof x
    center: ((x.icon.start[0] + x.icon.end[0]) / 2, -95)
    fontSize: "20px"
  }
  ensure x.icon.end[0] - x.icon.start[0] > 130
}

forall Blue a; Orange b {
  encourage equal(a.icon.start[0], -150)
  encourage equal(a.icon.end[0], 150)
  encourage equal(b.icon.start[0], -150)
  encourage equal(b.icon.end[0], 150)
  ensure disjointIntervals(a.icon, b.icon)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
