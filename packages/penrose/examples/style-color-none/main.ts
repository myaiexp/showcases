// none() leaves the fill or stroke out instead of making it transparent
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Disc
predicate NoFill(Disc)
predicate NoStroke(Disc)
`,
    substance: `Disc A, B, C
NoFill(A)
NoStroke(B)
AutoLabel All
`,
    style: `canvas {
  width = 640
  height = 300
}

backdrop {
  stripe = Rectangle {
    center : (0, 20)
    width : 620
    height : 50
    fillColor : rgba(0.8, 0.85, 0.95, 1.0)
    strokeWidth : 0.0
  }
}

forall Disc d {
  d.icon = Circle {
    center : (match_id * 190 - 380, 20)
    r : 62
    fillColor : rgba(0.95, 0.55, 0.2, 0.85)
    strokeColor : rgba(0.2, 0.2, 0.6, 1.0)
    strokeWidth : 8.0
  }
  d.text = Text {
    string : d.label
    center : (d.icon.center[0], 0 - 100)
    fontSize : "28px"
  }
  layer backdrop.stripe below d.icon
}

forall Disc d
where NoFill(d) {
  override d.icon.fillColor = none()
}

forall Disc d
where NoStroke(d) {
  override d.icon.strokeColor = none()
}
`,
  });
  return () => stage.dispose();
};

export default mount;
