// Rectangle rotation in degrees about the centre
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
  t.box = Rectangle {
    width : 90
    height : 60
    fillColor : rgba(0.35, 0.65, 0.9, 0.9)
    strokeColor : #123a66
    strokeWidth : 3
    rotation : 0
  }
}

forall Thing a; Thing b {
  ensure norm(a.box.center - b.box.center) > 110
}
`,
      },
      {
        label: 'rotation: 25',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.box = Rectangle {
    width : 90
    height : 60
    fillColor : rgba(0.35, 0.65, 0.9, 0.9)
    strokeColor : #123a66
    strokeWidth : 3
    rotation : 25
  }
}

forall Thing a; Thing b {
  ensure norm(a.box.center - b.box.center) > 110
}
`,
      },
      {
        label: 'rotation: -50',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.box = Rectangle {
    width : 90
    height : 60
    fillColor : rgba(0.35, 0.65, 0.9, 0.9)
    strokeColor : #123a66
    strokeWidth : 3
    rotation : -50
  }
}

forall Thing a; Thing b {
  ensure norm(a.box.center - b.box.center) > 110
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
