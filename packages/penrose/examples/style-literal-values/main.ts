// A literal-typed style variable runs once per literal and reads as its value
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `predicate P(Number)
predicate Q(String)
`,
    substance: `P(30)
P(55)
P(80)
Q("Hello")
Q("World")
`,
    style: `canvas {
  width = 640
  height = 300
}

forall Number n
where P(n) {
  Circle {
    center : (match_id * 170 - 330, 30)
    r : n
    strokeWidth : 0.0
    fillColor : rgba(0.45, 0.65, 0.95, 0.6)
  }
}

forall String s
where Q(s) {
  Text {
    string : s
    center : (match_id * 200 - 300, 0 - 110)
    fontSize : "34px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
