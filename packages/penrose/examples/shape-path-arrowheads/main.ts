// startArrowhead and endArrowhead on a curved Path
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'end: "straight"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.bend = (?, ?)
  ensure t.bend[1] > 30
  ensure t.bend[1] < 90
  ensure abs(t.bend[0]) < 100
  t.curve = Path {
    d : interpolateQuadraticFromPoints("open", (-140, -50), t.bend, (140, -50))
    strokeWidth : 4
    strokeColor : #1a3a6b
    endArrowhead : "straight"
  }
}
`,
      },
      {
        label: 'both ends: "concave"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.bend = (?, ?)
  ensure t.bend[1] > 30
  ensure t.bend[1] < 90
  ensure abs(t.bend[0]) < 100
  t.curve = Path {
    d : interpolateQuadraticFromPoints("open", (-140, -50), t.bend, (140, -50))
    strokeWidth : 4
    strokeColor : #1a3a6b
    startArrowhead : "concave"
    endArrowhead : "concave"
    startArrowheadSize : 1.3
    endArrowheadSize : 1.3
  }
}
`,
      },
      {
        label: 'end: "loop", size 1.6',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.bend = (?, ?)
  ensure t.bend[1] > 30
  ensure t.bend[1] < 90
  ensure abs(t.bend[0]) < 100
  t.curve = Path {
    d : interpolateQuadraticFromPoints("open", (-140, -50), t.bend, (140, -50))
    strokeWidth : 4
    strokeColor : #1a3a6b
    endArrowhead : "loop"
    endArrowheadSize : 1.6
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
