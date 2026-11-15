// Equation typesets a math-mode TeX string with MathJax
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'e^{i\\pi} + 1 = 0',
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
    string : "e^{i\\\\pi} + 1 = 0"
    center : (slide.dx, 0)
    fontSize : "34px"
    fillColor : #000000
  }
}
`,
      },
      {
        label: '\\sum_{k=1}^{n} k = \\f…',
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
    string : "\\\\sum_{k=1}^{n} k = \\\\frac{n(n+1)}{2}"
    center : (slide.dx, 0)
    fontSize : "34px"
    fillColor : #000000
  }
}
`,
      },
      {
        label: '\\int_0^1 x^2\\,dx = \\f…',
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
    string : "\\\\int_0^1 x^2\\\\,dx = \\\\frac{1}{3}"
    center : (slide.dx, 0)
    fontSize : "34px"
    fillColor : #000000
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
