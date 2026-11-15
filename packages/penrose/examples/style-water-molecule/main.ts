// The blog's water molecule: a symmetric Bond matches either order
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
  const version1 = `Hydrogen H1, H2
Oxygen O
Bond(O, H1)
Bond(O, H2)
AutoLabel All
`;
  const version2 = `Hydrogen H1, H2
Oxygen O
Bond(H1, O)
Bond(O, H2)
AutoLabel All
`;
  playground(stage, {
    domain: domain('symmetric '),
    substance: version1,
    style: `canvas {
  width = 520
  height = 400
}

forall Hydrogen h {
  h.icon = Circle {
    r : 28
    strokeWidth : 0.0
    fillColor : rgba(0.85, 0.9, 1.0, 1.0)
    center : (?, ?)
  }
  h.text = Text {
    string : h.label
    center : h.icon.center
    fontSize : "24px"
  }
}

forall Oxygen o {
  o.icon = Circle {
    r : 40
    strokeWidth : 0.0
    fillColor : rgba(0.95, 0.5, 0.45, 1.0)
    center : (0, 90)
  }
  o.text = Text {
    string : o.label
    center : o.icon.center
    fontSize : "28px"
  }
}

forall Atom a; Atom b
where Bond(a, b) {
  bond = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 6.0
  }
  layer bond below a.icon
  layer bond below b.icon
}

forall Oxygen o; Hydrogen h1; Hydrogen h2
where Bond(o, h1); Bond(o, h2) {
  -- half of 104.5 degrees, in radians, either side of straight down
  angle = 0.912
  override h1.icon.center = o.icon.center + 190.0 * (sin(angle), 0 - cos(angle))
  override h2.icon.center = o.icon.center + 190.0 * (0 - sin(angle), 0 - cos(angle))
}
`,
    variants: [
      { label: 'version 1: Bond(O, H1)' },
      { label: 'version 2: Bond(H1, O)', substance: version2 },
      { label: 'version 2, plain predicate', substance: version2, domain: domain('') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
