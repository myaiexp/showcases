// encourage cannot move random(); the same radius as an unknown reaches 50
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'r = random(20, 80)',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  scalar d.radius = random(20, 80)
  d.icon = Circle {
    center : (0, 0)
    r : d.radius
    fillColor : rgba(0.95, 0.6, 0.3, 0.75)
  }
  d.ring = Circle {
    center : (0, 0)
    r : 50
    fillColor : none()
    strokeColor : #333333
    strokeWidth : 2
    strokeDasharray : "5 4"
  }
  encourage d.radius == 50
  ensure d.radius > 5
}
`,
      },
      {
        label: 'r = ? (an unknown)',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  scalar d.radius = ?
  d.icon = Circle {
    center : (0, 0)
    r : d.radius
    fillColor : rgba(0.95, 0.6, 0.3, 0.75)
  }
  d.ring = Circle {
    center : (0, 0)
    r : 50
    fillColor : none()
    strokeColor : #333333
    strokeWidth : 2
    strokeDasharray : "5 4"
  }
  encourage d.radius == 50
  ensure d.radius > 5
}
`,
      },
    ],
    domain: `type Dot
`,
    substance: `Dot A
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
