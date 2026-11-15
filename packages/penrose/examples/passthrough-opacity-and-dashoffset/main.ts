// Number-valued passthroughs: group-style opacity and strokeDashoffset
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'opacity 1, offset 0',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.ring = Circle {
    r : 55
    fillColor : rgba(0.9, 0.5, 0.3, 1.0)
    strokeColor : #123a66
    strokeWidth : 8
    strokeDasharray : "14 14"
    opacity : 1
    strokeDashoffset : 0
  }
}

forall Dot a; Dot b {
  ensure norm(a.ring.center - b.ring.center) > 130
}
`,
      },
      {
        label: 'opacity 0.45, offset 0',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.ring = Circle {
    r : 55
    fillColor : rgba(0.9, 0.5, 0.3, 1.0)
    strokeColor : #123a66
    strokeWidth : 8
    strokeDasharray : "14 14"
    opacity : 0.45
    strokeDashoffset : 0
  }
}

forall Dot a; Dot b {
  ensure norm(a.ring.center - b.ring.center) > 130
}
`,
      },
      {
        label: 'opacity 0.45, offset 7',
        style: `canvas {
  width = 400
  height = 300
}

forall Dot d {
  d.ring = Circle {
    r : 55
    fillColor : rgba(0.9, 0.5, 0.3, 1.0)
    strokeColor : #123a66
    strokeWidth : 8
    strokeDasharray : "14 14"
    opacity : 0.45
    strokeDashoffset : 7
  }
}

forall Dot a; Dot b {
  ensure norm(a.ring.center - b.ring.center) > 130
}
`,
      },
    ],
    domain: `type Dot
`,
    substance: `Dot A, B
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
