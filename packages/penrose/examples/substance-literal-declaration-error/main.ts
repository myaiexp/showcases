// Declaring a Number or String object is refused
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'substance',
    variants: [
      {
        label: 'literal 12',

      },
      {
        label: 'Number n',
        substance: `-- (deliberate error)
Set S
Number n
Has(S, n)
`,
      },
      {
        label: 'String s',
        substance: `-- (deliberate error)
Set S
String s
`,
      },
    ],
    domain: `type Set
predicate Has(Set s, Number n)
`,
    substance: `Set S
Has(S, 12)
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Set s {
  s.icon = Circle {
    r : 120
    fillColor : #dfe8f5
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
