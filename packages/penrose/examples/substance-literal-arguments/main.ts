// HasNum and HasStr applied to number and string literals in Substance
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Set
predicate HasNum(Set set, Number num)
predicate HasStr(Set set, String str)
`,
    substance: `Set s1, s2
HasNum(s1, 1.234)
HasNum(s1, 2)
HasStr(s1, "Hello")
HasNum(s2, 5.678)
HasNum(s2, -5.678)
HasStr(s2, "world")
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set s {
  s.icon = Circle {
    r : 100
    strokeWidth : 3.0
    fillColor : #dfe8f5
  }
}

forall Set s
where HasStr(s, "Hello") {
  s.hello = Text {
    string : "Hello"
    fontSize : "32px"
  }
}
forall Set s
where HasStr(s, "world") {
  s.world = Text {
    string : "world"
    fontSize : "32px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
