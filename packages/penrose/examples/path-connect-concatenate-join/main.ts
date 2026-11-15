// Three ways to glue two sampled paths into one
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
  t.s = random(-30, 30)
  t.A = pathFromPoints("open", [(-150, -40 + t.s), (-105, 50), (-60, -40 + t.s)])
  t.B = pathFromPoints("open", [(20, -40), (75, 50 - t.s), (140, -30)])
  t.joined = Path {
    d : connectPaths("open", [t.A, t.B])
    strokeColor : #333333
    strokeWidth : 5
    fillColor : none()
  }
  t.pa = Path {
    d : t.A
    strokeColor : #2f6fbf
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.pb = Path {
    d : t.B
    strokeColor : #c0392b
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.a0 = Circle {
    center : (-150, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.a1 = Circle {
    center : (-60, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.b0 = Circle {
    center : (20, -40)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.b1 = Circle {
    center : (140, -30)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'connectPaths("open", …)',
      },
      {
        label: 'connectPaths("closed", …)',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(-30, 30)
  t.A = pathFromPoints("open", [(-150, -40 + t.s), (-105, 50), (-60, -40 + t.s)])
  t.B = pathFromPoints("open", [(20, -40), (75, 50 - t.s), (140, -30)])
  t.joined = Path {
    d : connectPaths("closed", [t.A, t.B])
    strokeColor : #333333
    strokeWidth : 5
    fillColor : #4f8fdc44
  }
  t.pa = Path {
    d : t.A
    strokeColor : #2f6fbf
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.pb = Path {
    d : t.B
    strokeColor : #c0392b
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.a0 = Circle {
    center : (-150, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.a1 = Circle {
    center : (-60, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.b0 = Circle {
    center : (20, -40)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.b1 = Circle {
    center : (140, -30)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'concatenatePaths([…])',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(-30, 30)
  t.A = pathFromPoints("open", [(-150, -40 + t.s), (-105, 50), (-60, -40 + t.s)])
  t.B = pathFromPoints("open", [(20, -40), (75, 50 - t.s), (140, -30)])
  t.joined = Path {
    d : concatenatePaths([t.A, t.B])
    strokeColor : #333333
    strokeWidth : 5
    fillColor : none()
  }
  t.pa = Path {
    d : t.A
    strokeColor : #2f6fbf
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.pb = Path {
    d : t.B
    strokeColor : #c0392b
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.a0 = Circle {
    center : (-150, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.a1 = Circle {
    center : (-60, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.b0 = Circle {
    center : (20, -40)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.b1 = Circle {
    center : (140, -30)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'joinPaths([…])',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(-30, 30)
  t.A = pathFromPoints("open", [(-150, -40 + t.s), (-105, 50), (-60, -40 + t.s)])
  t.B = pathFromPoints("open", [(20, -40), (75, 50 - t.s), (140, -30)])
  t.joined = Path {
    d : joinPaths([t.A, t.B])
    strokeColor : #333333
    strokeWidth : 5
    fillColor : none()
  }
  t.pa = Path {
    d : t.A
    strokeColor : #2f6fbf
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.pb = Path {
    d : t.B
    strokeColor : #c0392b
    strokeWidth : 2
    fillColor : none()
    strokeStyle : "dashed"
  }
  t.a0 = Circle {
    center : (-150, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.a1 = Circle {
    center : (-60, -40 + t.s)
    r : 5
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.b0 = Circle {
    center : (20, -40)
    r : 5
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.b1 = Circle {
    center : (140, -30)
    r : 5
    fillColor : #c0392b
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
