// The gap from a rectangle to a sampled line, as a bar
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
  t.w = random(70, 120)
  t.h = random(50, 100)
  t.gap = random(30, 100)
  t.bl = (-100 - t.w / 2, -t.h / 2)
  t.tr = (-100 + t.w / 2, t.h / 2)
  t.ls = (-100 + t.w / 2 + t.gap, random(-120, -80))
  t.le = (-100 + t.w / 2 + t.gap, random(80, 120))
  t.box = Rectangle {
    center : (-100, 0)
    width : t.w
    height : t.h
    fillColor : #4f8fdc33
    strokeColor : #2f6fbf
    strokeWidth : 3
  }
  t.line = Line {
    start : t.ls
    end : t.le
    strokeWidth : 5
    strokeColor : #333333
  }
  t.bar = Line {
    start : (t.tr[0], 0)
    end : (t.tr[0] + rectLineDist(t.bl, t.tr, t.ls, t.le), 0)
    strokeWidth : 6
    strokeColor : #c0392b
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
