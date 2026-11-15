// Circle drawn filled, outlined, or both with fillColor and strokeColor
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'Fill only',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : rgba(0.95, 0.55, 0.25, 1.0)
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 14)
}
`,
      },
      {
        label: 'Stroke only',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : none()
    strokeColor : #1a3a6b
    strokeWidth : 5
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.icon, b.icon, 14)
}
`,
      },
      {
        label: 'Fill and stroke',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 42
    fillColor : rgba(0.95, 0.55, 0.25, 1.0)
    strokeColor : #1a3a6b
    strokeWidth : 8
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
    fillColor : rgba(0.95, 0.55, 0.25, 1.0)
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
