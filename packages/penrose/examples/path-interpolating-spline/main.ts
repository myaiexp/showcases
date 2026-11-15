// A Catmull-Rom spline through sampled points at four tensions
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Thing
`,
    substance: `Thing T
`,
    style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pts = [(-150, random(-90, 90)), (-90, random(-90, 90)), (-30, random(-90, 90)), (30, random(-90, 90)), (90, random(-90, 90)), (150, random(-90, 90))]
  t.curve = Path {
    d : interpolatingSpline("open", t.pts, 0)
    strokeColor : #7a4fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'tension 0',
      },
      {
        label: 'tension 0.25',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pts = [(-150, random(-90, 90)), (-90, random(-90, 90)), (-30, random(-90, 90)), (30, random(-90, 90)), (90, random(-90, 90)), (150, random(-90, 90))]
  t.curve = Path {
    d : interpolatingSpline("open", t.pts, 0.25)
    strokeColor : #7a4fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'tension 0.6',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pts = [(-150, random(-90, 90)), (-90, random(-90, 90)), (-30, random(-90, 90)), (30, random(-90, 90)), (90, random(-90, 90)), (150, random(-90, 90))]
  t.curve = Path {
    d : interpolatingSpline("open", t.pts, 0.6)
    strokeColor : #7a4fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
      {
        label: '"closed", 0.25',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.pts = [(-150, random(-90, 90)), (-90, random(-90, 90)), (-30, random(-90, 90)), (30, random(-90, 90)), (90, random(-90, 90)), (150, random(-90, 90))]
  t.curve = Path {
    d : interpolatingSpline("closed", t.pts, 0.25)
    strokeColor : #7a4fbf
    strokeWidth : 4
    fillColor : none()
  }
  t.d0 = Circle {
    center : t.pts[0]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d1 = Circle {
    center : t.pts[1]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d2 = Circle {
    center : t.pts[2]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d3 = Circle {
    center : t.pts[3]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d4 = Circle {
    center : t.pts[4]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
  t.d5 = Circle {
    center : t.pts[5]
    r : 5
    fillColor : #333333
    strokeWidth : 0
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
