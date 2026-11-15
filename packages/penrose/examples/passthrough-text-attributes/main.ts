// letterSpacing and textDecoration passed through on a Text shape
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'none',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dx = ?
  d.word = Text {
    string : "Passthrough"
    center : (d.dx, 0)
    fontSize : "40px"
  }
  ensure d.dx == 0
}
`,
      },
      {
        label: 'letterSpacing: "6px"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dx = ?
  d.word = Text {
    string : "Passthrough"
    center : (d.dx, 0)
    fontSize : "40px"
    letterSpacing : "6px"
  }
  ensure d.dx == 0
}
`,
      },
      {
        label: 'textDecoration: "underline"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dx = ?
  d.word = Text {
    string : "Passthrough"
    center : (d.dx, 0)
    fontSize : "40px"
    textDecoration : "underline"
  }
  ensure d.dx == 0
}
`,
      },
    ],
    domain: `type Dot
`,
    substance: `Dot A
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
