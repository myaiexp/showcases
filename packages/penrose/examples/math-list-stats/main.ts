// Statistics of five sampled bar heights
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
  t.xs = [random(20, 200), random(20, 200), random(20, 200), random(20, 200), random(20, 200)]
  t.n = count(t.xs)
  t.gap = 320 / t.n
  t.bar0 = Rectangle {
    center : (-160 + 0 * t.gap + t.gap / 2, -130 + t.xs[0] / 2)
    width : t.gap * 0.6
    height : t.xs[0]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.bar1 = Rectangle {
    center : (-160 + 1 * t.gap + t.gap / 2, -130 + t.xs[1] / 2)
    width : t.gap * 0.6
    height : t.xs[1]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.bar2 = Rectangle {
    center : (-160 + 2 * t.gap + t.gap / 2, -130 + t.xs[2] / 2)
    width : t.gap * 0.6
    height : t.xs[2]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.bar3 = Rectangle {
    center : (-160 + 3 * t.gap + t.gap / 2, -130 + t.xs[3] / 2)
    width : t.gap * 0.6
    height : t.xs[3]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.bar4 = Rectangle {
    center : (-160 + 4 * t.gap + t.gap / 2, -130 + t.xs[4] / 2)
    width : t.gap * 0.6
    height : t.xs[4]
    fillColor : #9aa9bd
    strokeWidth : 0
  }
  t.top = Line {
    start : (-170, -130 + maxList(t.xs))
    end : (170, -130 + maxList(t.xs))
    strokeWidth : 3
    strokeColor : #c0392b
  }
  t.bottom = Line {
    start : (-170, -130 + minList(t.xs))
    end : (170, -130 + minList(t.xs))
    strokeWidth : 3
    strokeColor : #2f6fbf
  }
  t.mean = Line {
    start : (-170, -130 + average(t.xs))
    end : (170, -130 + average(t.xs))
    strokeWidth : 5
    strokeColor : #2e8b57
  }
  t.meanSum = Line {
    start : (-170, -130 + sum(t.xs) / count(t.xs))
    end : (170, -130 + sum(t.xs) / count(t.xs))
    strokeWidth : 2
    strokeColor : #e08a1e
    strokeStyle : "dashed"
  }
  t.l1 = Text {
    string : "maxList"
    center : (-135, 138)
    fontSize : "18px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "minList"
    center : (-60, 138)
    fontSize : "18px"
    fillColor : #2f6fbf
  }
  t.l3 = Text {
    string : "average"
    center : (20, 138)
    fontSize : "18px"
    fillColor : #2e8b57
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
