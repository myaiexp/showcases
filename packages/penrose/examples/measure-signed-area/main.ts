// A polygon's area drawn as an equal square, blue or red by sign
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
  t.q0 = random(35, 70)
  t.q1 = random(35, 70)
  t.q2 = random(35, 70)
  t.q3 = random(35, 70)
  t.q4 = random(35, 70)
  t.q5 = random(35, 70)
  t.q6 = random(35, 70)
  t.pts = [(-100 + t.q0 * 1, t.q0 * 0), (-100 + t.q1 * 0.623, t.q1 * 0.782), (-100 + t.q2 * -0.223, t.q2 * 0.975), (-100 + t.q3 * -0.901, t.q3 * 0.434), (-100 + t.q4 * -0.901, t.q4 * -0.434), (-100 + t.q5 * -0.223, t.q5 * -0.975), (-100 + t.q6 * 0.623, t.q6 * -0.782)]
  t.area = signedArea(t.pts, true)
  t.shape = Polygon {
    points : t.pts
    fillColor : #99999944
    strokeColor : #555555
    strokeWidth : 3
  }
  t.square = Rectangle {
    center : (110, 0)
    width : sqrt(abs(t.area))
    height : sqrt(abs(t.area))
    fillColor : rgba(0.5 - 0.4 * sign(t.area), 0.35, 0.5 + 0.4 * sign(t.area), 0.55)
    strokeWidth : 0
  }
  t.l1 = Text {
    string : "same area"
    center : (110, -100)
    fontSize : "20px"
    fillColor : #333333
  }
}
`,
    variants: [
      {
        label: 'points counterclockwise',
      },
      {
        label: 'points reversed',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.q0 = random(35, 70)
  t.q1 = random(35, 70)
  t.q2 = random(35, 70)
  t.q3 = random(35, 70)
  t.q4 = random(35, 70)
  t.q5 = random(35, 70)
  t.q6 = random(35, 70)
  t.pts = [(-100 + t.q6 * 0.623, t.q6 * -0.782), (-100 + t.q5 * -0.223, t.q5 * -0.975), (-100 + t.q4 * -0.901, t.q4 * -0.434), (-100 + t.q3 * -0.901, t.q3 * 0.434), (-100 + t.q2 * -0.223, t.q2 * 0.975), (-100 + t.q1 * 0.623, t.q1 * 0.782), (-100 + t.q0 * 1, t.q0 * 0)]
  t.area = signedArea(t.pts, true)
  t.shape = Polygon {
    points : t.pts
    fillColor : #99999944
    strokeColor : #555555
    strokeWidth : 3
  }
  t.square = Rectangle {
    center : (110, 0)
    width : sqrt(abs(t.area))
    height : sqrt(abs(t.area))
    fillColor : rgba(0.5 - 0.4 * sign(t.area), 0.35, 0.5 + 0.4 * sign(t.area), 0.55)
    strokeWidth : 0
  }
  t.l1 = Text {
    string : "same area"
    center : (110, -100)
    fontSize : "20px"
    fillColor : #333333
  }
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
