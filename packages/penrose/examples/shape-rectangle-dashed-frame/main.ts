// An unfilled Rectangle with dashed stroke around a smaller filled one
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'strokeStyle: "dashed"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.frame = Rectangle {
    center : (0, 0)
    width : 330
    height : 230
    fillColor : none()
    strokeColor : #444444
    strokeWidth : 3
    strokeStyle : "dashed"
  }
  t.inner = Rectangle {
    width : 90
    height : 60
    fillColor : rgba(0.4, 0.7, 0.4, 0.9)
  }
  ensure contains(t.frame, t.inner, 12)
}
`,
      },
      {
        label: 'strokeDasharray: "3 6"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.frame = Rectangle {
    center : (0, 0)
    width : 330
    height : 230
    fillColor : none()
    strokeColor : #444444
    strokeWidth : 3
    strokeDasharray : "3 6"
  }
  t.inner = Rectangle {
    width : 90
    height : 60
    fillColor : rgba(0.4, 0.7, 0.4, 0.9)
  }
  ensure contains(t.frame, t.inner, 12)
}
`,
      },
      {
        label: 'strokeDasharray: "20 6 6 6"',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.frame = Rectangle {
    center : (0, 0)
    width : 330
    height : 230
    fillColor : none()
    strokeColor : #444444
    strokeWidth : 3
    strokeDasharray : "20 6 6 6"
  }
  t.inner = Rectangle {
    width : 90
    height : 60
    fillColor : rgba(0.4, 0.7, 0.4, 0.9)
  }
  ensure contains(t.frame, t.inner, 12)
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing A
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
