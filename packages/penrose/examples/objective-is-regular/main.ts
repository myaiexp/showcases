// isRegular: equal sides and equal angles
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
  x.icon = Polygon {
    points: [(?[-170], ?[-90]), (?[180], ?[-50]), (?[30], ?[120])]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 4
  }
  ensure vdist(x.icon.points[0], x.icon.points[1]) > 50
  ensure vdist(x.icon.points[1], x.icon.points[2]) > 50
  ensure vdist(x.icon.points[2], x.icon.points[0]) > 50
}
`,
    variants: [
      {
        label: 'An uneven triangle',
      },
      {
        label: 'isRegular(points, true)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Polygon {
    points: [(?[-170], ?[-90]), (?[180], ?[-50]), (?[30], ?[120])]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 4
  }
  ensure vdist(x.icon.points[0], x.icon.points[1]) > 50
  ensure vdist(x.icon.points[1], x.icon.points[2]) > 50
  ensure vdist(x.icon.points[2], x.icon.points[0]) > 50
  encourage isRegular(x.icon.points, true)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
