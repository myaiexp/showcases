// The type of n comes from the predicate in Domain, so declaring it is optional
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (header: string): string => `canvas {
  width = 640
  height = 340
}

forall Set s {
  s.text = Text {
    string : s.label
    fontSize : "26px"
  }
}

${header} {
  s.icon = Circle {
    r : n
    strokeWidth : 0.0
    fillColor : rgba(0.95, 0.7, 0.35, 0.7)
  }
  ensure contains(s.icon, s.text)
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 20.0)
}
`;
  playground(stage, {
    domain: `type Set
predicate Has(Set, Number)
`,
    substance: `Set A, B, C
Has(A, 35)
Has(B, 55)
Has(C, 80)
AutoLabel All
`,
    style: style(`forall Set s
where Has(s, n)`),
    variants: [
      { label: 'n inferred', style: style(`forall Set s\nwhere Has(s, n)`) },
      { label: 'Number n declared', style: style(`forall Set s; Number n\nwhere Has(s, n)`) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
