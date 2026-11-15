// The + operator joins strings, labels included
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Set
`,
    substance: `Set Apples, Pears
AutoLabel All
`,
    style: `canvas {
  width = 700
  height = 320
}

forall Set x {
  string fancyLabel = "(" + x.label + ")"
  x.icon = Circle {
    r : 52
    strokeWidth : 0.0
    fillColor : rgba(0.55, 0.8, 0.6, 0.6)
  }
  x.name = Text {
    string : fancyLabel
    center : x.icon.center
    fontSize : "24px"
  }
  x.note = Text {
    string : "the set " + x.label + " ("  + "a fruit" + ")"
    center : x.icon.center + (0, 0 - 80)
    fontSize : "18px"
  }
}

forall Set a; Set b {
  ensure disjoint(a.icon, b.icon, 70.0)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
