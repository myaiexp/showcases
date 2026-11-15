// Declarations of the built-in literal types that Domain refuses
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    variants: [
      {
        label: 'valid',

      },
      {
        label: 'type Number',
        domain: `-- (deliberate error)
type Set
type Number
`,
        substance: `Set S
`,
      },
      {
        label: 'Set <: Number',
        domain: `-- (deliberate error)
type Set
Set <: Number
`,
        substance: `Set S
`,
      },
      {
        label: 'function -> Number',
        domain: `-- (deliberate error)
type Set
function addOne (Number n) -> Number
`,
        substance: `Set S
`,
      },
    ],
    domain: `type Set
predicate Has(Set s, Number n)
`,
    substance: `Set S
Has(S, 3)
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
