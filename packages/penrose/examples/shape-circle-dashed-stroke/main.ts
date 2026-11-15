// Circle outlines with strokeStyle dashed and a custom strokeDasharray
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'strokeStyle: "dashed"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : none()
    strokeColor : #222222
    strokeWidth : 4
    strokeStyle : "dashed"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 14)
}
`,
      },
      {
        label: 'strokeDasharray: "2 8"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : none()
    strokeColor : #222222
    strokeWidth : 4
    strokeDasharray : "2 8"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 14)
}
`,
      },
      {
        label: 'strokeDasharray: "14 4 2 4"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : none()
    strokeColor : #222222
    strokeWidth : 4
    strokeDasharray : "14 4 2 4"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 14)
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B, C
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : none()
    strokeColor : #222222
    strokeWidth : 4
    strokeStyle : "dashed"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 14)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
