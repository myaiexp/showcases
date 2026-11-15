// Polygon scale shrinks points about the svg origin, not the shape centre
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'scale: 1',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.ghost = Polygon {
    points : [(-60, -60), (60, -60), (60, 60), (-60, 60)]
    fillColor : none()
    strokeColor : #aaaaaa
    strokeWidth : 2
    strokeStyle : "dashed"
  }
  t.square = Polygon {
    points : [(-60, -60), (60, -60), (60, 60), (-60, 60)]
    scale : 1
    fillColor : rgba(0.9, 0.5, 0.2, 0.85)
    strokeColor : #7a3a00
    strokeWidth : 3
  }
  t.square above t.ghost
}
`,
      },
      {
        label: 'scale: 0.5',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.ghost = Polygon {
    points : [(-60, -60), (60, -60), (60, 60), (-60, 60)]
    fillColor : none()
    strokeColor : #aaaaaa
    strokeWidth : 2
    strokeStyle : "dashed"
  }
  t.square = Polygon {
    points : [(-60, -60), (60, -60), (60, 60), (-60, 60)]
    scale : 0.5
    fillColor : rgba(0.9, 0.5, 0.2, 0.85)
    strokeColor : #7a3a00
    strokeWidth : 3
  }
  t.square above t.ghost
}
`,
      },
      {
        label: 'scale: 0.25',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.ghost = Polygon {
    points : [(-60, -60), (60, -60), (60, 60), (-60, 60)]
    fillColor : none()
    strokeColor : #aaaaaa
    strokeWidth : 2
    strokeStyle : "dashed"
  }
  t.square = Polygon {
    points : [(-60, -60), (60, -60), (60, 60), (-60, 60)]
    scale : 0.25
    fillColor : rgba(0.9, 0.5, 0.2, 0.85)
    strokeColor : #7a3a00
    strokeWidth : 3
  }
  t.square above t.ghost
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
