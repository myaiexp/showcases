// The two ways to declare subtyping give identical diagrams
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    focus: 'domain',
    variants: [
      {
        label: 'type A <: B',

      },
      {
        label: 'A <: B later',
        domain: `type Atom
type Hydrogen
type Oxygen

-- the types exist already, so the keyword is left out
Hydrogen <: Atom
Oxygen <: Atom
`,
      },
    ],
    domain: `type Atom
type Hydrogen <: Atom
type Oxygen <: Atom
`,
    substance: `Hydrogen H1, H2
Oxygen O
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
`,
  });
  return () => stage.dispose();
};

export default mount;
