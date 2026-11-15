// A red bar the length of the distance across the gap of three pairs
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
  t.g1 = random(20, 90)
  t.g2 = random(20, 90)
  t.g3 = random(20, 90)
  t.c1 = Circle {
    center : (-170, 100)
    r : 32
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.c2 = Circle {
    center : (-170 + 64 + t.g1 + 32, 100)
    r : 32
    fillColor : #c0392b33
    strokeColor : #c0392b
    strokeWidth : 3
  }
  t.r1 = Rectangle {
    center : (-170, 0)
    width : 64
    height : 50
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.r2 = Rectangle {
    center : (-170 + 64 + t.g2 + 32, 0)
    width : 64
    height : 50
    rotation : 0
    fillColor : #c0392b33
    strokeColor : #c0392b
    strokeWidth : 3
  }
  t.r3 = Rectangle {
    center : (-170, -100)
    width : 64
    height : 50
    rotation : 0
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.c3 = Circle {
    center : (-170 + 32 + t.g3 + 32, -100)
    r : 32
    fillColor : #c0392b33
    strokeColor : #c0392b
    strokeWidth : 3
  }
  t.d1 = Line {
    start : (-138, 100)
    end : (-138 + shapeDistance(t.c1, t.c2), 100)
    strokeWidth : 6
    strokeColor : #333333
  }
  t.d2 = Line {
    start : (-138, 0)
    end : (-138 + shapeDistanceRects(bboxPts(t.r1), bboxPts(t.r2)), 0)
    strokeWidth : 6
    strokeColor : #333333
  }
  t.d3 = Line {
    start : (-138, -100)
    end : (-138 + shapeDistanceRectCircle(bboxPts(t.r3), t.c3.center, t.c3.r), -100)
    strokeWidth : 6
    strokeColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
