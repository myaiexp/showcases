// ensureOnCanvas keeps a circle inside the canvas, false lets it spill over
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'ensureOnCanvas: true (default)',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 60
    fillColor : rgba(0.85, 0.35, 0.35, 0.85)
    center : (?, ?)
  }
  ensure t.icon.center[0] > 170
  ensure t.icon.center[1] == 0
}
`,
      },
      {
        label: 'ensureOnCanvas: false',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 60
    fillColor : rgba(0.85, 0.35, 0.35, 0.85)
    center : (?, ?)
    ensureOnCanvas : false
  }
  ensure t.icon.center[0] > 170
  ensure t.icon.center[1] == 0
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.icon = Circle {
    r : 60
    center : (?, ?)
  }
  ensure t.icon.center[0] > 170
}
`,
  });
  return () => stage.dispose();
};

export default mount;
