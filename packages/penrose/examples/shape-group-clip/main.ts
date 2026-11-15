// A stack of stripes drawn whole, then clipped to a circle or a rectangle
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'noClip()',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

window {
  s0 = Rectangle {
    center : (0, 100)
    width : 360
    height : 40
    fillColor : #e8795a
  }
  s1 = Rectangle {
    center : (0, 60)
    width : 360
    height : 40
    fillColor : #f2b531
  }
  s2 = Rectangle {
    center : (0, 20)
    width : 360
    height : 40
    fillColor : #7bc47f
  }
  s3 = Rectangle {
    center : (0, -20)
    width : 360
    height : 40
    fillColor : #4f9fd8
  }
  s4 = Rectangle {
    center : (0, -60)
    width : 360
    height : 40
    fillColor : #8a6fd1
  }
  s5 = Rectangle {
    center : (0, -100)
    width : 360
    height : 40
    fillColor : #d9669a
  }

  g = Group {
    shapes : [s0, s1, s2, s3, s4, s5]
    clipPath : noClip()
  }
}
`,
      },
      {
        label: 'clip(circle)',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

window {
  s0 = Rectangle {
    center : (0, 100)
    width : 360
    height : 40
    fillColor : #e8795a
  }
  s1 = Rectangle {
    center : (0, 60)
    width : 360
    height : 40
    fillColor : #f2b531
  }
  s2 = Rectangle {
    center : (0, 20)
    width : 360
    height : 40
    fillColor : #7bc47f
  }
  s3 = Rectangle {
    center : (0, -20)
    width : 360
    height : 40
    fillColor : #4f9fd8
  }
  s4 = Rectangle {
    center : (0, -60)
    width : 360
    height : 40
    fillColor : #8a6fd1
  }
  s5 = Rectangle {
    center : (0, -100)
    width : 360
    height : 40
    fillColor : #d9669a
  }
  hole = Circle {
    center : (slide.dx, 0)
    r : 95
  }

  g = Group {
    shapes : [s0, s1, s2, s3, s4, s5, hole]
    clipPath : clip(hole)
  }
}
`,
      },
      {
        label: 'clip(rectangle)',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

window {
  s0 = Rectangle {
    center : (0, 100)
    width : 360
    height : 40
    fillColor : #e8795a
  }
  s1 = Rectangle {
    center : (0, 60)
    width : 360
    height : 40
    fillColor : #f2b531
  }
  s2 = Rectangle {
    center : (0, 20)
    width : 360
    height : 40
    fillColor : #7bc47f
  }
  s3 = Rectangle {
    center : (0, -20)
    width : 360
    height : 40
    fillColor : #4f9fd8
  }
  s4 = Rectangle {
    center : (0, -60)
    width : 360
    height : 40
    fillColor : #8a6fd1
  }
  s5 = Rectangle {
    center : (0, -100)
    width : 360
    height : 40
    fillColor : #d9669a
  }
  hole = Rectangle {
    center : (slide.dx, 0)
    width : 220
    height : 110
    cornerRadius : 24
    rotation : -12
  }

  g = Group {
    shapes : [s0, s1, s2, s3, s4, s5, hole]
    clipPath : clip(hole)
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
