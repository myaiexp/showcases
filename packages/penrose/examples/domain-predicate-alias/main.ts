// where Bond(a, b) as bond lets a shape belong to the predicate instance
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'style',
    domain: `type Atom
type Hydrogen <: Atom
type Oxygen <: Atom

predicate Bond(Atom, Atom)
`,
    substance: `Hydrogen H1, H2
Oxygen O
Bond(O, H1)
Bond(O, H2)
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

-- a second block reaches the same line through its own alias and restyles it
forall Oxygen o; Hydrogen h
where Bond(o, h) as b {
  override b.line.strokeColor = #c0392b
  override b.line.strokeWidth = 10.0
}
`,
  });
  return () => stage.dispose();
};

export default mount;
