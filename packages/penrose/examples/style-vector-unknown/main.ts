// Unknown components are the only ones the optimizer may change
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (spot: string): string => `canvas {
  width = 560
  height = 360
}

axes {
  across = Line {
    start : (0 - 270, 0)
    end : (270, 0)
    strokeWidth : 1.5
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeStyle : "dashed"
  }
  up = Line {
    start : (0, 0 - 170)
    end : (0, 170)
    strokeWidth : 1.5
    strokeColor : rgba(0.6, 0.6, 0.6, 1.0)
    strokeStyle : "dashed"
  }
}

forall Pt p {
  vec2 spot = ${spot}
  p.dot = Circle {
    center : spot
    r : 22
    strokeWidth : 0.0
    fillColor : rgba(0.9, 0.35, 0.3, 0.8)
  }
  p.text = Text {
    string : p.label
    center : spot
    fontSize : "22px"
  }
}

forall Pt a; Pt b {
  ensure vdist(a.dot.center, b.dot.center) > 160.0
}
`;
  const slide = style('(?, 0.0)');
  playground(stage, {
    domain: `type Pt
`,
    substance: `Pt P, Q
AutoLabel All
`,
    style: slide,
    variants: [
      { label: 'vec2 spot = (?, 0.0)', style: slide },
      { label: 'vec2 spot = (0.0, ?)', style: style('(0.0, ?)') },
      { label: 'vec2 spot = (?, ?)', style: style('(?, ?)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
