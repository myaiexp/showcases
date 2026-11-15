// Has(s, i) for i in [1, 4] passes the numbers 1 to 4 as Number literals
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Set
predicate Has(Set s, Number n)
`,
    substance: `Set S
Has(S, i) for i in [1, 4]
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set s {
  s.icon = Circle {
    r : 150
    strokeWidth : 3.0
    fillColor : #dfe8f5
  }
}

forall Set s
where Has(s, 1) {
  s.one = Text {
    string : "1"
    center : (-90, 40)
    fontSize : "40px"
  }
}
forall Set s
where Has(s, 2) {
  s.two = Text {
    string : "2"
    center : (-30, 40)
    fontSize : "40px"
  }
}
forall Set s
where Has(s, 3) {
  s.three = Text {
    string : "3"
    center : (30, 40)
    fontSize : "40px"
  }
}
forall Set s
where Has(s, 4) {
  s.four = Text {
    string : "4"
    center : (90, 40)
    fontSize : "40px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
