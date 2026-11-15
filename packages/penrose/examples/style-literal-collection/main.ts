// Collected number literals reach the body as a plain vector of their values
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `predicate P(Number)
`,
    substance: `P(20)
P(35)
P(50)
P(95)
`,
    style: `canvas {
  width = 480
  height = 360
}

collect Number n into ns
where P(n) {
  Circle {
    center : (0, 0)
    r : maxList(ns)
    fillColor : rgba(0.45, 0.65, 0.95, 0.3)
    strokeColor : rgba(0.2, 0.35, 0.7, 1.0)
    strokeWidth : 3.0
  }
  Circle {
    center : (0, 0)
    r : average(ns)
    fillColor : rgba(0.95, 0.75, 0.3, 0.5)
    strokeColor : rgba(0.6, 0.4, 0.0, 1.0)
    strokeWidth : 3.0
  }
  Circle {
    center : (0, 0)
    r : minList(ns)
    fillColor : rgba(0.9, 0.35, 0.3, 0.7)
    strokeWidth : 0.0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
