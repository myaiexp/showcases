// The optional type before a field names what the value is
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Planet
`,
    substance: `Planet Mercury, Venus, Earth
AutoLabel All
`,
    style: `canvas {
  width = 640
  height = 320
}

forall Planet p {
  scalar radius = 24 + 9 * match_id
  vec2 spot = (?, 0.0)
  color tint = hsva(40 * match_id, 60, 95, 1.0)
  string caption = "planet " + p.label
  int rank = match_id

  p.icon = Circle {
    r : radius
    center : spot
    fillColor : tint
    strokeWidth : 0.0
  }
  p.text = Text {
    string : caption
    center : spot + (0, 0 - radius - 26)
    fontSize : "20px"
  }
  ensure p.icon.center[0] > rank * 130 - 330
  ensure p.icon.center[0] < rank * 130 - 270
}
`,
  });
  return () => stage.dispose();
};

export default mount;
