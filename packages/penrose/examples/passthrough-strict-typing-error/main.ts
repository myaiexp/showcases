// A boolean passthrough fails with a type error (deliberate error)
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'colorInterpolation: true',
        style: `-- (deliberate error)
canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 60
    colorInterpolation : true
  }
}
`,
      },
      {
        label: 'colorInterpolation: "sRGB"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 60
    colorInterpolation : "sRGB"
  }
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
