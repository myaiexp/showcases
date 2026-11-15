// Properties are read with the dot operator and set with override
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B, C
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 300
}

forall Set x {
  -- declares a circle with radius 20 + 15 * match_id
  x.shape = Circle {
    r : 20 + 15 * match_id
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.7)
  }
  -- set a property after the declaration
  override x.shape.center = (match_id * 150 - 300, 10)
  -- read properties back: the caption sits under the circle, whatever its radius
  x.caption = Text {
    string : x.label
    center : (x.shape.center[0], x.shape.center[1] - x.shape.r - 30)
    fontSize : "24px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
