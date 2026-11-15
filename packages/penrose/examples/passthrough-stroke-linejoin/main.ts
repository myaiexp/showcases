// strokeLinejoin passes through to SVG as stroke-linejoin on a Polyline
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'strokeLinejoin: "miter"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dx = ?
  d.zig = Polyline {
    points : [(d.dx - 110, -50), (d.dx - 50, 55), (d.dx, -50), (d.dx + 50, 55), (d.dx + 110, -50)]
    strokeWidth : 22
    strokeColor : #2a6f97
    strokeLinejoin : "miter"
  }
  ensure d.dx == 0
}
`,
      },
      {
        label: 'strokeLinejoin: "round"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dx = ?
  d.zig = Polyline {
    points : [(d.dx - 110, -50), (d.dx - 50, 55), (d.dx, -50), (d.dx + 50, 55), (d.dx + 110, -50)]
    strokeWidth : 22
    strokeColor : #2a6f97
    strokeLinejoin : "round"
  }
  ensure d.dx == 0
}
`,
      },
      {
        label: 'strokeLinejoin: "bevel"',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.dx = ?
  d.zig = Polyline {
    points : [(d.dx - 110, -50), (d.dx - 50, 55), (d.dx, -50), (d.dx + 50, 55), (d.dx + 110, -50)]
    strokeWidth : 22
    strokeColor : #2a6f97
    strokeLinejoin : "bevel"
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
