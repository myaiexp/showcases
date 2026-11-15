// A symmetric Bond matches either argument order; without symmetric the order matters
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    variants: [
      {
        label: 'symmetric',

      },
      {
        label: 'plain predicate',
        domain: `type Atom
type Hydrogen <: Atom
type Oxygen <: Atom

predicate Bond(Atom, Atom)
`,
      },
    ],
    domain: `type Atom
type Hydrogen <: Atom
type Oxygen <: Atom

symmetric predicate Bond(Atom, Atom)
`,
    substance: `Hydrogen H1, H2
Oxygen O
Bond(O, H1)
Bond(H2, O)
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

forall Oxygen o; Hydrogen h
where Bond(o, h) as bond {
  bond.line = Line {
    start : o.icon.center
    end : h.icon.center
    strokeWidth : 6.0
    strokeColor : #444444
  }
  layer bond.line below o.icon
  layer bond.line below h.icon
  ensure vdist(o.icon.center, h.icon.center) == 110.0
}
`,
  });
  return () => stage.dispose();
};

export default mount;
