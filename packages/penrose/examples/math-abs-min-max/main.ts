// Two sampled bar heights and what abs, min, max and average2 make of them
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
  t.a = random(30, 220)
  t.b = random(30, 220)
  t.base = Line {
    start : (-190, -120)
    end : (190, -120)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.A = Rectangle {
    center : (-150, -120 + t.a / 2)
    width : 36
    height : t.a
    fillColor : #7a8fa6
    strokeWidth : 0
  }
  t.B = Rectangle {
    center : (-100, -120 + t.b / 2)
    width : 36
    height : t.b
    fillColor : #a68f7a
    strokeWidth : 0
  }
  t.mx = Rectangle {
    center : (-30, -120 + max(t.a, t.b) / 2)
    width : 36
    height : max(t.a, t.b)
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.mn = Rectangle {
    center : (20, -120 + min(t.a, t.b) / 2)
    width : 36
    height : min(t.a, t.b)
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.av = Rectangle {
    center : (70, -120 + average2(t.a, t.b) / 2)
    width : 36
    height : average2(t.a, t.b)
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.df = Rectangle {
    center : (120, -120 + abs(t.a - t.b) + 2 / 2)
    width : 36
    height : abs(t.a - t.b) + 2
    fillColor : #e08a1e
    strokeWidth : 0
  }
  t.la = Text {
    string : "a"
    center : (-150, -140)
    fontSize : "18px"
    fillColor : #333333
  }
  t.lb = Text {
    string : "b"
    center : (-100, -140)
    fontSize : "18px"
    fillColor : #333333
  }
  t.l1 = Text {
    string : "max"
    center : (-30, -140)
    fontSize : "18px"
    fillColor : #333333
  }
  t.l2 = Text {
    string : "min"
    center : (20, -140)
    fontSize : "18px"
    fillColor : #333333
  }
  t.l3 = Text {
    string : "avg"
    center : (70, -140)
    fontSize : "18px"
    fillColor : #333333
  }
  t.l4 = Text {
    string : "gap"
    center : (120, -140)
    fontSize : "18px"
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
