// Built-in Number and String arguments in predicates, written as literals in Substance
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    domain: `type Set
predicate Has(Set s, Number n)
predicate Named(Set s, String str)
`,
    substance: `Set S
Has(S, 7)
Has(S, 11)
Named(S, "primes")
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
where Has(s, 7) {
  s.seven = Text {
    string : "7"
    center : (-60, 20)
    fontSize : "40px"
  }
}

forall Set s
where Has(s, 11) {
  s.eleven = Text {
    string : "11"
    center : (60, 20)
    fontSize : "40px"
  }
}

forall Set s
where Named(s, "primes") {
  s.name = Text {
    string : "primes"
    center : (0, 90)
    fontSize : "32px"
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
