// A bare name is local to the match; a dotted path belongs to its owner
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Box
predicate Next(Box, Box)
`,
    substance: `Box A, B, C
Next(A, B)
Next(B, C)
AutoLabel All
`,
    style: `canvas {
  width = 640
  height = 300
}

forall Box b {
  -- local: gone once this match is over
  side = 40 + 18 * match_id
  -- bound to the Substance object: other blocks can read b.icon
  b.icon = Rectangle {
    width : side
    height : side
    center : (?, 0)
    fillColor : rgba(0.85, 0.9, 1.0, 1.0)
    strokeColor : rgba(0.2, 0.3, 0.6, 1.0)
    strokeWidth : 3.0
  }
  b.text = Text {
    string : b.label
    center : b.icon.center
    fontSize : "26px"
  }
  ensure onCanvas(b.icon, canvas.width, canvas.height)
}

forall Box a; Box b
where Next(a, b) as n {
  -- bound to the predicate application, not to either box
  n.arrow = Line {
    start : a.icon.center
    end : b.icon.center
    strokeWidth : 4.0
    strokeColor : rgba(0.85, 0.3, 0.2, 1.0)
    endArrowhead : "straight"
  }
  ensure a.icon.center[0] + 150 < b.icon.center[0]
  layer n.arrow below a.icon
  layer n.arrow below b.icon
}
`,
  });
  return () => stage.dispose();
};

export default mount;
