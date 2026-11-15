// The angle of a vector with the x axis, drawn as an arc
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
  t.v = (random(-150, 150), random(-110, 110))
  t.ang = angleOf(t.v)
  t.ang2 = atan2(t.v[0], t.v[1])
  t.xAxis = Line {
    start : (-190, 0)
    end : (190, 0)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.yAxis = Line {
    start : (0, -140)
    end : (0, 140)
    strokeWidth : 1
    strokeColor : #cccccc
  }
  t.arcA = Path {
    d : circularArc("open", (0, 0), 38, 0, t.ang)
    strokeColor : #2f6fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.arcB = Path {
    d : circularArc("open", (0, 0), 54, 0, t.ang2)
    strokeColor : #c0392b
    strokeWidth : 4
    fillColor : none()
  }
  t.vec = Line {
    start : (0, 0)
    end : t.v
    strokeWidth : 4
    strokeColor : #333333
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.l1 = Text {
    string : "angleOf"
    center : (-120, 120)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l2 = Text {
    string : "atan2"
    center : (-120, 98)
    fontSize : "18px"
    fillColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
