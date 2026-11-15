// Repeat(2, k) is the point (k, k); repeat(5, h) lifts five bars together
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
  t.h = random(0, 60)
  t.step = random(14, 24)
  t.base = (random(20, 90), random(20, 90), random(20, 90), random(20, 90), random(20, 90))
  t.lifted = t.base + repeat(5, t.h)
  t.diag1 = Circle {
    center : repeat(2, 1 * t.step) + (-190, -150)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.diag2 = Circle {
    center : repeat(2, 2 * t.step) + (-190, -150)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.diag3 = Circle {
    center : repeat(2, 3 * t.step) + (-190, -150)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.diag4 = Circle {
    center : repeat(2, 4 * t.step) + (-190, -150)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.diag5 = Circle {
    center : repeat(2, 5 * t.step) + (-190, -150)
    r : 6
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.bar0 = Rectangle {
    center : (-110, -90 + t.lifted[0] / 2)
    width : 34
    height : t.lifted[0]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.low0 = Rectangle {
    center : (-110, -90 + t.base[0] / 2)
    width : 34
    height : t.base[0]
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.bar1 = Rectangle {
    center : (-60, -90 + t.lifted[1] / 2)
    width : 34
    height : t.lifted[1]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.low1 = Rectangle {
    center : (-60, -90 + t.base[1] / 2)
    width : 34
    height : t.base[1]
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.bar2 = Rectangle {
    center : (-10, -90 + t.lifted[2] / 2)
    width : 34
    height : t.lifted[2]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.low2 = Rectangle {
    center : (-10, -90 + t.base[2] / 2)
    width : 34
    height : t.base[2]
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.bar3 = Rectangle {
    center : (40, -90 + t.lifted[3] / 2)
    width : 34
    height : t.lifted[3]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.low3 = Rectangle {
    center : (40, -90 + t.base[3] / 2)
    width : 34
    height : t.base[3]
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.bar4 = Rectangle {
    center : (90, -90 + t.lifted[4] / 2)
    width : 34
    height : t.lifted[4]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.low4 = Rectangle {
    center : (90, -90 + t.base[4] / 2)
    width : 34
    height : t.base[4]
    fillColor : #2e8b57
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
