// Radius windows set with ensure > and < on three unrelated circles
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: '25 < r < 40',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
  ensure x.icon.r < 40
}
`,
      },
      {
        label: '60 < r < 90',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 60
  ensure x.icon.r < 90
}
`,
      },
      {
        label: '120 < r < 150',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 120
  ensure x.icon.r < 150
}
`,
      },
    ],
    domain: `type Set
`,
    substance: `Set A, B, C
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
  ensure x.icon.r < 40
}
`,
  });
  return () => stage.dispose();
};

export default mount;
