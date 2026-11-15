// Sin, cos and tan read off a sampled angle on a circle
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
  t.c = (-60, -20)
  t.R = 80
  t.deg = random(15, 60)
  t.a = toRadians(t.deg)
  t.p = (t.c[0] + t.R * cos(t.a), t.c[1] + t.R * sin(t.a))
  t.ring = Circle {
    center : t.c
    r : t.R
    fillColor : none()
    strokeColor : #999999
    strokeWidth : 2
  }
  t.axis = Line {
    start : (-190, -20)
    end : (190, -20)
    strokeWidth : 1
    strokeColor : #bbbbbb
  }
  t.tangent = Line {
    start : (t.c[0] + t.R, t.c[1])
    end : (t.c[0] + t.R, t.c[1] + t.R * tan(t.a))
    strokeWidth : 5
    strokeColor : #e08a1e
  }
  t.ray = Line {
    start : t.c
    end : t.p
    strokeWidth : 3
    strokeColor : #333333
  }
  t.cosLeg = Line {
    start : t.c
    end : (t.p[0], t.c[1])
    strokeWidth : 5
    strokeColor : #2f6fbf
  }
  t.sinLeg = Line {
    start : (t.p[0], t.c[1])
    end : t.p
    strokeWidth : 5
    strokeColor : #c0392b
  }
  t.pt = Circle {
    center : t.p
    r : 6
    fillColor : #333333
    strokeWidth : 0
  }
  t.cosText = Text {
    string : "cos"
    center : (t.c[0] + t.R * cos(t.a) / 2, t.c[1] - 16)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.sinText = Text {
    string : "sin"
    center : (t.p[0] + 22, t.c[1] + t.R * sin(t.a) / 2)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.tanText = Text {
    string : "tan"
    center : (t.c[0] + t.R + 24, t.c[1] + t.R * tan(t.a) / 2)
    fontSize : "18px"
    fillColor : #e08a1e
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
