// Tutorial 1 challenge 2: three sets drawn as 50 by 50 rectangles
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
  x.icon = Rectangle {
    width : 50.0
    height : 50.0
    strokeWidth : 0.0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
