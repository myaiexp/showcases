// Equation fontSize as a CSS length and fillColor for the glyph colour
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'fontSize: "22px"',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

formula {
  eq = Equation {
    string : "\\\\frac{a+b}{2} \\\\ge \\\\sqrt{ab}"
    center : (slide.dx, 0)
    fontSize : "22px"
    fillColor : #1a3a6b
  }
}
`,
      },
      {
        label: 'fontSize: "40px"',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

formula {
  eq = Equation {
    string : "\\\\frac{a+b}{2} \\\\ge \\\\sqrt{ab}"
    center : (slide.dx, 0)
    fontSize : "40px"
    fillColor : #b5446e
  }
}
`,
      },
      {
        label: 'fontSize: "58px"',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

formula {
  eq = Equation {
    string : "\\\\frac{a+b}{2} \\\\ge \\\\sqrt{ab}"
    center : (slide.dx, 0)
    fontSize : "58px"
    fillColor : #2f7f4f
  }
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
