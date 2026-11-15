// Unit normals at the points where sampled rays strike three shapes
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
  t.hc = Circle {
    center : rayIntersect(t.c, t.O, t.dc)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.hr = Circle {
    center : rayIntersect(t.r, t.O, t.dr)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.hp = Circle {
    center : rayIntersect(t.p, t.O, t.dp)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.nc = Line {
    start : rayIntersect(t.c, t.O, t.dc)
    end : rayIntersect(t.c, t.O, t.dc) + 40 * rayIntersectNormal(t.c, t.O, t.dc)
    strokeWidth : 4
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.nr = Line {
    start : rayIntersect(t.r, t.O, t.dr)
    end : rayIntersect(t.r, t.O, t.dr) + 40 * rayIntersectNormal(t.r, t.O, t.dr)
    strokeWidth : 4
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
  t.np = Line {
    start : rayIntersect(t.p, t.O, t.dp)
    end : rayIntersect(t.p, t.O, t.dp) + 40 * rayIntersectNormal(t.p, t.O, t.dp)
    strokeWidth : 4
    strokeColor : #2e8b57
    endArrowhead : "straight"
    endArrowheadSize : 0.8
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
