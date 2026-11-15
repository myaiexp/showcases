// Symmetric predicates need two arguments of exactly one type; the others fail
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    variants: [
      {
        label: 'Atom, Atom',

      },
      {
        label: 'Atom, Oxygen',
        domain: `-- (deliberate error)
type Atom
type Hydrogen <: Atom
type Oxygen <: Atom

symmetric predicate Bond(Atom, Oxygen)
`,
      },
      {
        label: 'three arguments',
        domain: `-- (deliberate error)
type Atom
type Hydrogen <: Atom
type Oxygen <: Atom

symmetric predicate Bond(Atom, Atom, Atom)
`,
      },
    ],
    domain: `type Atom
type Hydrogen <: Atom
type Oxygen <: Atom

symmetric predicate Bond(Atom, Atom)
`,
    substance: `Hydrogen H
Oxygen O
Bond(H, O)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Atom a {
  a.icon = Circle {
    r : 36
    strokeWidth : 3.0
    strokeColor : #444444
    fillColor : #cccccc
  }
  a.text = Text {
    string : a.label
    center : a.icon.center
    fontSize : "30px"
  }
  ensure contains(a.icon, a.text)
  layer a.text above a.icon
}

forall Hydrogen h {
  override h.icon.fillColor = #f4f4f4
  override h.icon.r = 28
}

forall Oxygen o {
  override o.icon.fillColor = #e86a5a
  override o.icon.r = 42
}

forall Atom a; Atom b
where Bond(a, b) as bond {
  bond.line = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 6.0
    strokeColor : #444444
  }
  layer bond.line below a.icon
  layer bond.line below b.icon
  ensure vdist(a.icon.center, b.icon.center) == 110.0
}
`,
  });
  return () => stage.dispose();
};

export default mount;
