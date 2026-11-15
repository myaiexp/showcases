// Opacity on a Group blends its members together, not one by one
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'opacity on each circle',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

trio {
  c0 = Circle {
    center : (-45 + slide.dx, 25)
    r : 70
    fillColor : #d94f4f
    opacity : 0.5
  }
  c1 = Circle {
    center : (45 + slide.dx, 25)
    r : 70
    fillColor : #3f6fbf
    opacity : 0.5
  }
  c2 = Circle {
    center : (0 + slide.dx, -45)
    r : 70
    fillColor : #3f9f5f
    opacity : 0.5
  }
  g = Group {
    shapes : [c0, c1, c2]
  }
}
`,
      },
      {
        label: 'opacity on the Group',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

trio {
  c0 = Circle {
    center : (-45 + slide.dx, 25)
    r : 70
    fillColor : #d94f4f
  }
  c1 = Circle {
    center : (45 + slide.dx, 25)
    r : 70
    fillColor : #3f6fbf
  }
  c2 = Circle {
    center : (0 + slide.dx, -45)
    r : 70
    fillColor : #3f9f5f
  }
  g = Group {
    shapes : [c0, c1, c2]
    opacity : 0.5
  }
}
`,
      },
    ],
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: ``,
  });
  return () => stage.dispose();
};

export default mount;
