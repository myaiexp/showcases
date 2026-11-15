// A wide picture fitted into a tall box by meet, slice and none
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'preserveAspectRatio: "xMidYMid meet"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "flag.svg"
    width : 120
    height : 160
    preserveAspectRatio : "xMidYMid meet"
  }
  t.frame = Rectangle {
    center : t.pic.center
    width : t.pic.width
    height : t.pic.height
    fillColor : none()
    strokeColor : #d94f4f
    strokeWidth : 2
    strokeDasharray : "5 4"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.pic, b.pic, 30)
}
`,
      },
      {
        label: 'preserveAspectRatio: "xMidYMid slice"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "flag.svg"
    width : 120
    height : 160
    preserveAspectRatio : "xMidYMid slice"
  }
  t.frame = Rectangle {
    center : t.pic.center
    width : t.pic.width
    height : t.pic.height
    fillColor : none()
    strokeColor : #d94f4f
    strokeWidth : 2
    strokeDasharray : "5 4"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.pic, b.pic, 30)
}
`,
      },
      {
        label: 'preserveAspectRatio: "none"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "flag.svg"
    width : 120
    height : 160
    preserveAspectRatio : "none"
  }
  t.frame = Rectangle {
    center : t.pic.center
    width : t.pic.width
    height : t.pic.height
    fillColor : none()
    strokeColor : #d94f4f
    strokeWidth : 2
    strokeDasharray : "5 4"
  }
}

forall Thing a; Thing b {
  ensure disjoint(a.pic, b.pic, 30)
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
