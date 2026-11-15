// Layer directives on a Group or on one of its members move the whole group
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'g1 above g2',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

pile {
  r1 = Circle {
    center : (-55 + slide.dx, 20)
    r : 55
    fillColor : #d94f4f
  }
  r2 = Circle {
    center : (-10 + slide.dx, 20)
    r : 55
    fillColor : #f2994a
  }
  b1 = Circle {
    center : (10 + slide.dx, -20)
    r : 55
    fillColor : #3f6fbf
  }
  b2 = Circle {
    center : (55 + slide.dx, -20)
    r : 55
    fillColor : #4fb3bf
  }
  g1 = Group {
    shapes : [r1, r2]
  }
  g2 = Group {
    shapes : [b1, b2]
  }
  g1 above g2
}
`,
      },
      {
        label: 'g2 above g1',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

pile {
  r1 = Circle {
    center : (-55 + slide.dx, 20)
    r : 55
    fillColor : #d94f4f
  }
  r2 = Circle {
    center : (-10 + slide.dx, 20)
    r : 55
    fillColor : #f2994a
  }
  b1 = Circle {
    center : (10 + slide.dx, -20)
    r : 55
    fillColor : #3f6fbf
  }
  b2 = Circle {
    center : (55 + slide.dx, -20)
    r : 55
    fillColor : #4fb3bf
  }
  g1 = Group {
    shapes : [r1, r2]
  }
  g2 = Group {
    shapes : [b1, b2]
  }
  g2 above g1
}
`,
      },
      {
        label: 'r1 above b1 (member)',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

pile {
  r1 = Circle {
    center : (-55 + slide.dx, 20)
    r : 55
    fillColor : #d94f4f
  }
  r2 = Circle {
    center : (-10 + slide.dx, 20)
    r : 55
    fillColor : #f2994a
  }
  b1 = Circle {
    center : (10 + slide.dx, -20)
    r : 55
    fillColor : #3f6fbf
  }
  b2 = Circle {
    center : (55 + slide.dx, -20)
    r : 55
    fillColor : #4fb3bf
  }
  g1 = Group {
    shapes : [r1, r2]
  }
  g2 = Group {
    shapes : [b1, b2]
  }
  r1 above b1
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
