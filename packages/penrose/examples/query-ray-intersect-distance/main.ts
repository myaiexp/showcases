// How far each sampled ray travels before it hits a shape
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
  width = 480
  height = 360
}

forall Thing t {
  t.O = (-190, random(-30, 30))
  t.dc = unitVector(random(0.2, 0.55))
  t.dr = unitVector(random(-0.2, 0.2))
  t.dp = unitVector(random(-0.55, -0.2))
  t.c = Circle {
    center : (60, 100)
    r : 36
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.r = Rectangle {
    center : (70, 0)
    width : 80
    height : 60
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.p = Polygon {
    points : [(30, -90), (110, -100), (70, -150)]
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.rayc = Line {
    start : t.O
    end : t.O + 450 * t.dc
    strokeWidth : 1
    strokeColor : #bbbbbb
    strokeStyle : "dashed"
  }
  t.rayr = Line {
    start : t.O
    end : t.O + 450 * t.dr
    strokeWidth : 1
    strokeColor : #bbbbbb
    strokeStyle : "dashed"
  }
  t.rayp = Line {
    start : t.O
    end : t.O + 450 * t.dp
    strokeWidth : 1
    strokeColor : #bbbbbb
    strokeStyle : "dashed"
  }
  t.origin = Circle {
    center : t.O
    r : 8
    fillColor : #333333
    strokeWidth : 0
  }
  t.distC = Line {
    start : t.O
    end : t.O + min(rayIntersectDistance(t.c, t.O, t.dc), 450) * t.dc
    strokeWidth : 5
    strokeColor : #c0392b
  }
  t.distR = Line {
    start : t.O
    end : t.O + min(rayIntersectDistance(t.r, t.O, t.dr), 450) * t.dr
    strokeWidth : 5
    strokeColor : #c0392b
  }
  t.distP = Line {
    start : t.O
    end : t.O + min(rayIntersectDistance(t.p, t.O, t.dp), 450) * t.dp
    strokeWidth : 5
    strokeColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
