// Tutorial 1 challenge 3: rectangles with 15 px strokes in sampled colours
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
    strokeWidth : 15
    strokeColor : sampleColor(0.5, "rgb")
  }
  ensure x.icon.width > 40
  ensure x.icon.height > 40
  ensure x.icon.width < 160
  ensure x.icon.height < 160
}
`,
  });
  return () => stage.dispose();
};

export default mount;
