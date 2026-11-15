// isEquiangular: all corners the same angle
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
    points: [(?[-140], ?[-50]), (?[100], ?[-110]), (?[150], ?[60]), (?[-60], ?[110])]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 4
  }
  ensure vdist(x.icon.points[0], x.icon.points[1]) > 60
  ensure vdist(x.icon.points[1], x.icon.points[2]) > 60
  ensure vdist(x.icon.points[2], x.icon.points[3]) > 60
  ensure vdist(x.icon.points[3], x.icon.points[0]) > 60
}
`,
    variants: [
      {
        label: 'An uneven kite',
      },
      {
        label: 'isEquiangular(points, true)',
        style: `canvas {
  width = 600
  height = 450
}

forall Blue x {
  x.icon = Polygon {
    points: [(?[-140], ?[-50]), (?[100], ?[-110]), (?[150], ?[60]), (?[-60], ?[110])]
    fillColor: #4f8fdc66
    strokeColor: #2f6fbf
    strokeWidth: 4
  }
  ensure vdist(x.icon.points[0], x.icon.points[1]) > 60
  ensure vdist(x.icon.points[1], x.icon.points[2]) > 60
  ensure vdist(x.icon.points[2], x.icon.points[3]) > 60
  ensure vdist(x.icon.points[3], x.icon.points[0]) > 60
  ensure isEquiangular(x.icon.points, true)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
