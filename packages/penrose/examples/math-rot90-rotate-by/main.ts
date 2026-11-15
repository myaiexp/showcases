// Rotating a sampled vector by a quarter turn and by an angle
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
  t.ang = random(0, 6.28)
  t.v = 110 * unitVector(t.ang)
  t.theta = random(0.4, 1.3)
  t.vArrow = Line {
    start : (0, 0)
    end : t.v
    strokeWidth : 4
    strokeColor : #777777
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.quarter = Line {
    start : (0, 0)
    end : rot90(t.v)
    strokeWidth : 4
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.turned = Line {
    start : (0, 0)
    end : rotateBy(t.v, t.theta)
    strokeWidth : 4
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.sweep = Path {
    d : circularArc("open", (0, 0), 42, t.ang, t.ang - t.theta)
    strokeColor : #c0392b
    strokeWidth : 3
    fillColor : none()
  }
  t.l1 = Text {
    string : "rot90"
    center : (-150, 125)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l2 = Text {
    string : "rotateBy"
    center : (-150, 105)
    fontSize : "18px"
    fillColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
