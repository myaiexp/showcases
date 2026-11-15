// Has(s, 1) in a header matches only statements with that same literal
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (value: number): string => `canvas {
  width = 600
  height = 300
}

forall Set s {
  s.icon = Circle {
    r : 44
    strokeWidth : 0.0
    fillColor : rgba(0.8, 0.8, 0.8, 1.0)
  }
  s.text = Text {
    string : s.label
    center : s.icon.center
    fontSize : "26px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 40.0)
}

forall Set s
where Has(s, ${value}) {
  override s.icon.fillColor = rgba(0.95, 0.65, 0.2, 1.0)
}
`;
  playground(stage, {
    domain: `type Set
predicate Has(Set, Number)
`,
    substance: `Set A, B, C
Has(A, 1)
Has(B, 2)
Has(C, 1)
AutoLabel All
`,
    style: style(1),
    variants: [
      { label: 'Has(s, 1)', style: style(1) },
      { label: 'Has(s, 2)', style: style(2) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
