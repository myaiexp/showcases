// Five discs of one sampled colour at rising opacity over a striped floor
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
  t.base = rgba(random(0.2, 1), random(0.2, 1), random(0.2, 1), 1)
  t.bar0 = Rectangle {
    center : (0, -60)
    width : 380
    height : 16
    fillColor : #333333
    strokeWidth : 0
  }
  t.bar1 = Rectangle {
    center : (0, -20)
    width : 380
    height : 16
    fillColor : #333333
    strokeWidth : 0
  }
  t.bar2 = Rectangle {
    center : (0, 20)
    width : 380
    height : 16
    fillColor : #333333
    strokeWidth : 0
  }
  t.bar3 = Rectangle {
    center : (0, 60)
    width : 380
    height : 16
    fillColor : #333333
    strokeWidth : 0
  }
  t.d0 = Circle {
    center : (-140, 0)
    r : 32
    fillColor : setOpacity(t.base, 0.2)
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : (-70, 0)
    r : 32
    fillColor : setOpacity(t.base, 0.4)
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : (0, 0)
    r : 32
    fillColor : setOpacity(t.base, 0.6)
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : (70, 0)
    r : 32
    fillColor : setOpacity(t.base, 0.8)
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : (140, 0)
    r : 32
    fillColor : setOpacity(t.base, 1)
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
