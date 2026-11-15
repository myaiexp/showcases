// Tutorial 1 challenge 1: a third Set draws a third circle with no Style change
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A
Set B
Set C
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set x {
  x.icon = Circle {
    strokeWidth : 0.0
  }
  -- the tutorial's next lesson: keep every radius in a sane range
  ensure x.icon.r > 25
}
`,
  });
  return () => stage.dispose();
};

export default mount;
