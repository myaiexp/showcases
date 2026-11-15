// Ellipse with a thick outline, a dashed outline and a dash pattern
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'Thick outline',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    rx : 85
    ry : 42
    fillColor : rgba(0.3, 0.5, 0.9, 0.15)
    strokeColor : #1a3a8f
    strokeWidth : 9
  }
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 100
}
`,
      },
      {
        label: 'Dashed',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    rx : 85
    ry : 42
    fillColor : rgba(0.3, 0.5, 0.9, 0.15)
    strokeColor : #1a3a8f
    strokeWidth : 4
    strokeStyle : "dashed"
  }
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 100
}
`,
      },
      {
        label: 'Dash and dot',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Ellipse {
    rx : 85
    ry : 42
    fillColor : rgba(0.3, 0.5, 0.9, 0.15)
    strokeColor : #1a3a8f
    strokeWidth : 4
    strokeDasharray : "16 5 3 5"
  }
}

forall Thing a; Thing b {
  ensure norm(a.icon.center - b.icon.center) > 100
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
