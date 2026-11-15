// Image rotation in degrees about the centre of its box
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'rotation: 0',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "arrow.svg"
    width : 80
    height : 80
    rotation : 0
  }
}

forall Thing a; Thing b {
  ensure norm(a.pic.center - b.pic.center) > 105
}
`,
      },
      {
        label: 'rotation: 90',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "arrow.svg"
    width : 80
    height : 80
    rotation : 90
  }
}

forall Thing a; Thing b {
  ensure norm(a.pic.center - b.pic.center) > 105
}
`,
      },
      {
        label: 'rotation: -45',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pic = Image {
    href : "arrow.svg"
    width : 80
    height : 80
    rotation : -45
  }
}

forall Thing a; Thing b {
  ensure norm(a.pic.center - b.pic.center) > 105
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A, B, C
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
