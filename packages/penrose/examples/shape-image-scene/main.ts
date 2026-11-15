// A little scene whose pictures are chosen by Substance type
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Scenery
type House <: Scenery
type Tree <: Scenery
type Cloud <: Scenery
`,
    substance: `House H
Tree T1, T2
Cloud C
`,
    style: `canvas {
  width = 400
  height = 300
}

ground {
  strip = Rectangle {
    center : (0, -125)
    width : 400
    height : 50
    fillColor : #bfe3a8
  }
}

forall House h {
  h.pic = Image {
    href : "house.svg"
    width : 110
    height : 110
    center : (?, -45)
  }
}

forall Tree t {
  t.pic = Image {
    href : "tree.svg"
    width : 80
    height : 80
    center : (?, -60)
  }
}

forall Cloud c {
  c.pic = Image {
    href : "cloud.svg"
    width : 100
    height : 100
    center : (?, 90)
  }
}

forall Scenery a; Scenery b {
  ensure disjoint(a.pic, b.pic, 8)
}
`,
  });
  return () => stage.dispose();
};

export default mount;
