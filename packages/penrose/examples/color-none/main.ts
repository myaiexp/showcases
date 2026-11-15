// Three discs: filled and stroked, only stroked, only filled
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.r = random(35, 48)
  t.hue = rgba(random(0, 1), random(0.3, 0.8), random(0, 1), 1)
  t.both = Circle {
    center : (-120, 0)
    r : t.r
    fillColor : setOpacity(t.hue, 0.5)
    strokeColor : t.hue
    strokeWidth : 8
  }
  t.ringOnly = Circle {
    center : (0, 0)
    r : t.r
    fillColor : none()
    strokeColor : t.hue
    strokeWidth : 8
  }
  t.fillOnly = Circle {
    center : (120, 0)
    r : t.r
    fillColor : setOpacity(t.hue, 0.5)
    strokeColor : none()
  }
  t.l1 = Text {
    string : "both"
    center : (-120, -80)
    fontSize : "20px"
    fillColor : #333333
  }
  t.l2 = Text {
    string : "fill: none()"
    center : (0, -80)
    fontSize : "18px"
    fillColor : #333333
  }
  t.l3 = Text {
    string : "stroke: none()"
    center : (120, -80)
    fontSize : "18px"
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
