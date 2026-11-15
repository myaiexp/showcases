// Tutorial 1 challenge 4: every set draws both a circle and a square
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
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
  x.box = Rectangle {
    width : 50.0
    height : 50.0
    strokeWidth : 0.0
  }
  ensure x.icon.r > 25
}
`,
  });
  return () => stage.dispose();
};

export default mount;
