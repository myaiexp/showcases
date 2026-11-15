// The field a shape is assigned to can have any name; Penrose draws every Shape
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'style',
    variants: [
      {
        label: '.icon',

      },
      {
        label: '.foo',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.foo = Circle {
    strokeWidth : 0.0
  }
  ensure x.foo.r > 30
}
`,
      },
      {
        label: '.ImALittleTeapot',
        style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.ImALittleTeapot = Circle {
    strokeWidth : 0.0
  }
  ensure x.ImALittleTeapot.r > 30
}
`,
      },
    ],
    domain: `type Set
`,
    substance: `Set A, B
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  ensure x.icon.r > 30
}
`,
  });
  return () => stage.dispose();
};

export default mount;
