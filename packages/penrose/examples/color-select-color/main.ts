// Two sampled colours chosen by whether i + j is even or odd
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
  t.c1 = rgba(random(0, 1), random(0, 1), random(0, 1), 1)
  t.c2 = rgba(random(0, 1), random(0, 1), random(0, 1), 1)
  t.tile0 = Rectangle {
    center : (-125, 75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 0)
    strokeWidth : 0
  }
  t.tile1 = Rectangle {
    center : (-75, 75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 1)
    strokeWidth : 0
  }
  t.tile2 = Rectangle {
    center : (-25, 75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 2)
    strokeWidth : 0
  }
  t.tile3 = Rectangle {
    center : (25, 75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 3)
    strokeWidth : 0
  }
  t.tile4 = Rectangle {
    center : (75, 75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 4)
    strokeWidth : 0
  }
  t.tile5 = Rectangle {
    center : (125, 75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 5)
    strokeWidth : 0
  }
  t.tile6 = Rectangle {
    center : (-125, 25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 1)
    strokeWidth : 0
  }
  t.tile7 = Rectangle {
    center : (-75, 25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 2)
    strokeWidth : 0
  }
  t.tile8 = Rectangle {
    center : (-25, 25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 3)
    strokeWidth : 0
  }
  t.tile9 = Rectangle {
    center : (25, 25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 4)
    strokeWidth : 0
  }
  t.tile10 = Rectangle {
    center : (75, 25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 5)
    strokeWidth : 0
  }
  t.tile11 = Rectangle {
    center : (125, 25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 6)
    strokeWidth : 0
  }
  t.tile12 = Rectangle {
    center : (-125, -25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 2)
    strokeWidth : 0
  }
  t.tile13 = Rectangle {
    center : (-75, -25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 3)
    strokeWidth : 0
  }
  t.tile14 = Rectangle {
    center : (-25, -25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 4)
    strokeWidth : 0
  }
  t.tile15 = Rectangle {
    center : (25, -25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 5)
    strokeWidth : 0
  }
  t.tile16 = Rectangle {
    center : (75, -25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 6)
    strokeWidth : 0
  }
  t.tile17 = Rectangle {
    center : (125, -25)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 7)
    strokeWidth : 0
  }
  t.tile18 = Rectangle {
    center : (-125, -75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 3)
    strokeWidth : 0
  }
  t.tile19 = Rectangle {
    center : (-75, -75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 4)
    strokeWidth : 0
  }
  t.tile20 = Rectangle {
    center : (-25, -75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 5)
    strokeWidth : 0
  }
  t.tile21 = Rectangle {
    center : (25, -75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 6)
    strokeWidth : 0
  }
  t.tile22 = Rectangle {
    center : (75, -75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 7)
    strokeWidth : 0
  }
  t.tile23 = Rectangle {
    center : (125, -75)
    width : 50
    height : 50
    fillColor : selectColor(t.c1, t.c2, 8)
    strokeWidth : 0
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
