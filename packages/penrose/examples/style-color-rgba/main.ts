// rgba(r, g, b, a): channel and opacity ramps worked out from the match number
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Swatch
`,
    substance: `Swatch a, b, c, d, e
NoLabel a, b, c, d, e
`,
    style: `canvas {
  width = 640
  height = 340
}

backdrop {
  stripe = Rectangle {
    center : (0, 90)
    width : 600
    height : 40
    fillColor : rgba(0.15, 0.15, 0.2, 1.0)
    strokeWidth : 0.0
  }
}

forall Swatch s {
  t = (match_id - 1) / (match_total - 1)
  -- top row: the same red, less and less opaque
  s.fade = Rectangle {
    center : (match_id * 110 - 330, 90)
    width : 90
    height : 90
    fillColor : rgba(0.95, 0.25, 0.2, 1.0 - 0.8 * t)
    strokeWidth : 0.0
  }
  -- bottom row: red to blue
  s.mix = Rectangle {
    center : (match_id * 110 - 330, 0 - 70)
    width : 90
    height : 90
    fillColor : rgba(0.95 - 0.8 * t, 0.2, 0.15 + 0.8 * t, 1.0)
    strokeWidth : 0.0
  }
  layer backdrop.stripe below s.fade
}
`,
  });
  return () => stage.dispose();
};

export default mount;
