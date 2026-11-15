// The inverse trig functions turn a ratio into an angle
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
  t.s = random(-0.9, 0.9)
  t.R = 110
  t.ring = Circle {
    center : (0, 0)
    r : t.R
    fillColor : none()
    strokeColor : #bbbbbb
    strokeWidth : 2
  }
  t.axis = Line {
    start : (-150, 0)
    end : (150, 0)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.acosSpoke = Line {
    start : (0, 0)
    end : (t.R * cos(acos(t.s)), t.R * sin(acos(t.s)))
    strokeWidth : 4
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.atanSpoke = Line {
    start : (0, 0)
    end : (t.R * cos(atan(t.s)), t.R * sin(atan(t.s)))
    strokeWidth : 4
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.acosText = Text {
    string : "acos"
    center : (1.25 * t.R * cos(acos(t.s)), 1.25 * t.R * sin(acos(t.s)))
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.atanText = Text {
    string : "atan"
    center : (1.25 * t.R * cos(atan(t.s)), 1.25 * t.R * sin(atan(t.s)))
    fontSize : "18px"
    fillColor : #2e8b57
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
