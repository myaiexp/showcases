// A Group inside a Group, shown by opacity on either level
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    variants: [
      {
        label: 'outer opacity 0.4',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

demo {
  s4 = Circle {
    center : (-70 + slide.dx, 0)
    r : 70
    fillColor : #4f9fd8
  }
  s1 = Circle {
    center : (20 + slide.dx, 20)
    r : 55
    fillColor : #e8795a
  }
  s2 = Rectangle {
    center : (60 + slide.dx, -20)
    width : 120
    height : 70
    fillColor : #f2b531
  }
  s3 = Text {
    string : "Hello"
    center : (30 + slide.dx, 10)
    fontSize : "26px"
  }
  g = Group {
    shapes : [s1, s2, s3]
  }
  g2 = Group {
    shapes : [s4, g]
    opacity : 0.4
  }
}
`,
      },
      {
        label: 'inner opacity 0.4',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

demo {
  s4 = Circle {
    center : (-70 + slide.dx, 0)
    r : 70
    fillColor : #4f9fd8
  }
  s1 = Circle {
    center : (20 + slide.dx, 20)
    r : 55
    fillColor : #e8795a
  }
  s2 = Rectangle {
    center : (60 + slide.dx, -20)
    width : 120
    height : 70
    fillColor : #f2b531
  }
  s3 = Text {
    string : "Hello"
    center : (30 + slide.dx, 10)
    fontSize : "26px"
  }
  g = Group {
    shapes : [s1, s2, s3]
    opacity : 0.4
  }
  g2 = Group {
    shapes : [s4, g]
  }
}
`,
      },
      {
        label: 'both 0.5',
        style: `canvas {
  width = 400
  height = 300
}

slide {
  dx = ?
  ensure dx == 0
}

demo {
  s4 = Circle {
    center : (-70 + slide.dx, 0)
    r : 70
    fillColor : #4f9fd8
  }
  s1 = Circle {
    center : (20 + slide.dx, 20)
    r : 55
    fillColor : #e8795a
  }
  s2 = Rectangle {
    center : (60 + slide.dx, -20)
    width : 120
    height : 70
    fillColor : #f2b531
  }
  s3 = Text {
    string : "Hello"
    center : (30 + slide.dx, 10)
    fontSize : "26px"
  }
  g = Group {
    shapes : [s1, s2, s3]
    opacity : 0.5
  }
  g2 = Group {
    shapes : [s4, g]
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
