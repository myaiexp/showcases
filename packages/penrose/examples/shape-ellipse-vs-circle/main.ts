// The same ellipse with ry equal to, half of, and double rx
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'ry = rx',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    rx : 45
    ry : 45
    fillColor : rgba(0.9, 0.6, 0.2, 0.85)
  }
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 105
}
`,
      },
      {
        label: 'ry = rx / 2',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    rx : 45
    ry : 22
    fillColor : rgba(0.9, 0.6, 0.2, 0.85)
  }
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 105
}
`,
      },
      {
        label: 'ry = 2 * rx',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    rx : 45
    ry : 90
    fillColor : rgba(0.9, 0.6, 0.2, 0.85)
  }
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 105
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B, C
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
