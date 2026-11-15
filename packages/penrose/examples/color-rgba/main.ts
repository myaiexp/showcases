// A red ramp and an opacity ramp built from rgba
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
  t.g = random(0, 1)
  t.b = random(0, 1)
  t.r0 = Rectangle {
    center : (-140, 70)
    width : 40
    height : 80
    fillColor : rgba(0, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r1 = Rectangle {
    center : (-100, 70)
    width : 40
    height : 80
    fillColor : rgba(0.143, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r2 = Rectangle {
    center : (-60, 70)
    width : 40
    height : 80
    fillColor : rgba(0.286, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r3 = Rectangle {
    center : (-20, 70)
    width : 40
    height : 80
    fillColor : rgba(0.429, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r4 = Rectangle {
    center : (20, 70)
    width : 40
    height : 80
    fillColor : rgba(0.571, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r5 = Rectangle {
    center : (60, 70)
    width : 40
    height : 80
    fillColor : rgba(0.714, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r6 = Rectangle {
    center : (100, 70)
    width : 40
    height : 80
    fillColor : rgba(0.857, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.r7 = Rectangle {
    center : (140, 70)
    width : 40
    height : 80
    fillColor : rgba(1, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.stripe = Rectangle {
    center : (0, -70)
    width : 330
    height : 28
    fillColor : #333333
    strokeWidth : 0
  }
  t.a0 = Rectangle {
    center : (-140, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.125)
    strokeWidth : 0
  }
  t.a1 = Rectangle {
    center : (-100, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.25)
    strokeWidth : 0
  }
  t.a2 = Rectangle {
    center : (-60, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.375)
    strokeWidth : 0
  }
  t.a3 = Rectangle {
    center : (-20, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.5)
    strokeWidth : 0
  }
  t.a4 = Rectangle {
    center : (20, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.625)
    strokeWidth : 0
  }
  t.a5 = Rectangle {
    center : (60, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.75)
    strokeWidth : 0
  }
  t.a6 = Rectangle {
    center : (100, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 0.875)
    strokeWidth : 0
  }
  t.a7 = Rectangle {
    center : (140, -70)
    width : 40
    height : 80
    fillColor : rgba(0.9, t.g, t.b, 1)
    strokeWidth : 0
  }
  t.l1 = Text {
    string : "r from 0 to 1"
    center : (0, 135)
    fontSize : "20px"
    fillColor : #333333
  }
  t.l2 = Text {
    string : "alpha from 0 to 1"
    center : (0, -135)
    fontSize : "20px"
    fillColor : #333333
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
