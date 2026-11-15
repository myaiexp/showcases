// A symmetric Bond(h, o) in Style matches Bond(O, H) in Substance
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const domain = (kind: string): string => `type Atom
type Hydrogen <: Atom
type Oxygen <: Atom
${kind}predicate Bond(Atom, Atom)
`;
  playground(stage, {
    domain: domain('symmetric '),
    substance: `Hydrogen H
Oxygen O
Bond(O, H)
AutoLabel All
`,
    style: `canvas {
  width = 520
  height = 320
}

forall Hydrogen h {
  h.icon = Circle {
    r : 26
    strokeWidth : 0.0
    fillColor : rgba(0.85, 0.9, 1.0, 1.0)
  }
  h.text = Text {
    string : h.label
    center : h.icon.center
    fontSize : "24px"
  }
}

forall Oxygen o {
  o.icon = Circle {
    r : 38
    strokeWidth : 0.0
    fillColor : rgba(0.95, 0.5, 0.45, 1.0)
  }
  o.text = Text {
    string : o.label
    center : o.icon.center
    fontSize : "28px"
  }
}

forall Hydrogen h; Oxygen o {
  ensure disjoint(h.icon, o.icon, 100.0)
}

-- written with the hydrogen first, the opposite of the Substance order
forall Hydrogen h; Oxygen o
where Bond(h, o) {
  bond = Line {
    start : h.icon.center
    end : o.icon.center
    strokeWidth : 6.0
  }
  layer bond below h.icon
  layer bond below o.icon
}
`,
    variants: [
      { label: 'symmetric: matches', domain: domain('symmetric ') },
      { label: 'plain predicate: no match', domain: domain('') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
