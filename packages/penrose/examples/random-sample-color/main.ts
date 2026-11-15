// sampleColor draws random rgb or hsv colours once per shape
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'sampleColor(0.9, "rgb")',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 36
    fillColor : sampleColor(0.9, "rgb")
  }
}

forall Dot a; Dot b {
  ensure disjoint(a.icon, b.icon, 8)
}
`,
      },
      {
        label: 'sampleColor(0.9, "hsv")',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.icon = Circle {
    r : 36
    fillColor : sampleColor(0.9, "hsv")
  }
}

forall Dot a; Dot b {
  ensure disjoint(a.icon, b.icon, 8)
}
`,
      },
    ],
    domain: `type Dot
`,
    substance: `Dot A, B, C, D, E, F
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
