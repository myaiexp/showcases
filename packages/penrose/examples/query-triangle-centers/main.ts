// Three classical centres of a sampled triangle
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
  width = 480
  height = 360
}

forall Thing t {
  t.A = (random(-190, -120), random(-110, -60))
  t.B = (random(110, 190), random(-110, -60))
  t.C = (random(-60, 60), random(40, 110))
  t.tri = Polygon {
    points : [t.A, t.B, t.C]
    fillColor : #dddddd66
    strokeColor : #555555
    strokeWidth : 3
  }
  t.g = Circle {
    center : barycenter(t.A, t.B, t.C)
    r : 8
    fillColor : #c0392b
    strokeWidth : 0
  }
  t.o = Circle {
    center : circumcenter(t.A, t.B, t.C)
    r : 8
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.i = Circle {
    center : incenter(t.A, t.B, t.C)
    r : 8
    fillColor : #2e8b57
    strokeWidth : 0
  }
  t.l1 = Text {
    string : "barycenter"
    center : (-140, -160)
    fontSize : "20px"
    fillColor : #c0392b
  }
  t.l2 = Text {
    string : "circumcenter"
    center : (10, -160)
    fontSize : "20px"
    fillColor : #2f6fbf
  }
  t.l3 = Text {
    string : "incenter"
    center : (150, -160)
    fontSize : "20px"
    fillColor : #2e8b57
  }
}
`,
  });
  return () => stage.dispose();
};

export default mount;
