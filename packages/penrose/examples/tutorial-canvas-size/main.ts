// The canvas block fixes the diagram size; the same sets re-lay out on three sizes
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: '400 by 300',
        style: `canvas {
  width = 400
  height = 300
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}
`,
      },
      {
        label: '600 by 450',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}
`,
      },
      {
        label: '800 by 700',
        style: `canvas {
  width = 800
  height = 700
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}
`,
      },
    ],
    domain: `type Set
`,
    substance: `Set A, B
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}
`,
  });
  return () => stage.dispose();
};

export default mount;
