// Tutorial 1: two sets, each drawn as a circle whose size, place and colour are sampled
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    // Nothing bounds the radii, so some variations shrink a circle through zero and off the
    // canvas (the next tutorial adds `ensure x.icon.r > 25`). These three lay out cleanly.
    variations: ['tutorial-1', 'tutorial-2', 'tutorial-3'],
    domain: `type Set
`,
    substance: `Set A
Set B
`,
    style: `canvas {
  width = 800
  height = 700
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
