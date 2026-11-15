// nameof n is the text of the literal n, which + can join to other strings
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `predicate P(Number)
`,
    substance: `P(40)
P(65)
P(90)
`,
    style: `canvas {
  width = 640
  height = 320
}

forall Number n
where P(n) {
  x = match_id * 190 - 380
  Circle {
    center : (x, 10)
    r : n
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
  Text {
    string : "radius " + nameof n
    center : (x, 0 - 130)
    fontSize : "24px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
