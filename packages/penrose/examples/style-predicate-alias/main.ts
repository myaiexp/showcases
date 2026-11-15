// bond.line belongs to the matched predicate, so a later block can restyle it
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Atom
predicate Bond(Atom, Atom)
predicate Strong(Atom, Atom)
`,
    substance: `Atom A, B, C
Bond(A, B)
Bond(B, C)
Strong(B, C)
AutoLabel All
`,
    style: `canvas {
  width = 600
  height = 340
}

forall Atom a {
  a.icon = Circle {
    r : 32
    strokeWidth : 0.0
    fillColor : rgba(0.85, 0.9, 1.0, 1.0)
  }
  a.text = Text {
    string : a.label
    center : a.icon.center
    fontSize : "26px"
  }
}

forall Atom a; Atom b {
  ensure disjoint(a.icon, b.icon, 70.0)
}

forall Atom a; Atom b
where Bond(a, b) as bond {
  bond.line = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 3.0
  }
  layer bond.line below a.icon
  layer bond.line below b.icon
}

-- the same Bond(B, C) again, reached through the alias of this block
forall Atom a; Atom b
where Bond(a, b) as bond; Strong(a, b) {
  override bond.line.strokeWidth = 12.0
  override bond.line.strokeColor = rgba(0.85, 0.25, 0.2, 1.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
