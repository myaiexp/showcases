// Rectangle corners squared, rounded, and rounded all the way to a pill
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'cornerRadius: 0',
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
    cornerRadius : 0
  }
}

forall Thing a; Thing b {
  ensure norm(a.box.center - b.box.center) > 120
}
`,
      },
      {
        label: 'cornerRadius: 14',
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
    cornerRadius : 14
  }
}

forall Thing a; Thing b {
  ensure norm(a.box.center - b.box.center) > 120
}
`,
      },
      {
        label: 'cornerRadius: 30',
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
    cornerRadius : 30
  }
}

forall Thing a; Thing b {
  ensure norm(a.box.center - b.box.center) > 120
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
