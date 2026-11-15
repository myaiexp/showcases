// Subscript names typeset as plain TeX and after TeXify
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.ink = rgba(random(0, 0.5), random(0, 0.5), random(0, 0.5), 1)
  t.raw = Equation {
    string : "v_{max} + p_start + u_in"
    center : (0, 55)
    fontSize : "34px"
    fillColor : t.ink
  }
  t.fixed = Equation {
    string : TeXify("v_max") + " + " + TeXify("p_start") + " + " + TeXify("u_in")
    center : (0, -55)
    fontSize : "34px"
    fillColor : t.ink
  }
  t.l1 = Text {
    string : "raw"
    center : (-165, 100)
    fontSize : "20px"
    fillColor : #777777
  }
  t.l2 = Text {
    string : "TeXify"
    center : (-150, -10)
    fontSize : "20px"
    fillColor : #2f6fbf
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
