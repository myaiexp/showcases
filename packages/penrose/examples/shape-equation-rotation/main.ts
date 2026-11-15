// Equation rotation in degrees about its centre
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'rotation: 0',
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
    string : "\\\\lim_{n\\\\to\\\\infty}\\\\left(1+\\\\frac1n\\\\right)^n = e"
    center : (slide.dx, 0)
    fontSize : "32px"
    fillColor : #000000
    rotation : 0
  }
}
`,
      },
      {
        label: 'rotation: 30',
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
    string : "\\\\lim_{n\\\\to\\\\infty}\\\\left(1+\\\\frac1n\\\\right)^n = e"
    center : (slide.dx, 0)
    fontSize : "32px"
    fillColor : #000000
    rotation : 30
  }
}
`,
      },
      {
        label: 'rotation: -90',
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
    string : "\\\\lim_{n\\\\to\\\\infty}\\\\left(1+\\\\frac1n\\\\right)^n = e"
    center : (slide.dx, 0)
    fontSize : "32px"
    fillColor : #000000
    rotation : -90
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
