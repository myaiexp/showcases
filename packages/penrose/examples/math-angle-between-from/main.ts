// Unsigned and signed angle between two sampled vectors
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
  t.u = 120 * unitVector(random(-3, 3))
  t.a = random(0.5, 2.7)
  t.sgn = sign(random(-1, 1))
  t.v = 100 * unitVector(angleOf(t.u) + t.sgn * t.a)
  t.between = angleBetween(t.u, t.v)
  t.fromAng = angleFrom(t.u, t.v)
  t.uArrow = Line {
    start : (0, 0)
    end : t.u
    strokeWidth : 4
    strokeColor : #2f6fbf
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.vArrow = Line {
    start : (0, 0)
    end : t.v
    strokeWidth : 4
    strokeColor : #c0392b
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.arcBetween = Path {
    d : circularArc("open", (0, 0), 36, angleOf(t.u), angleOf(t.u) + t.between)
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.arcFrom = Path {
    d : circularArc("open", (0, 0), 56, angleOf(t.u), angleOf(t.u) + t.fromAng)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.l1 = Text {
    string : "angleBetween"
    center : (-110, 125)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l2 = Text {
    string : "angleFrom"
    center : (-110, 105)
    fontSize : "18px"
    fillColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
