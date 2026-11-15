// Bars for the signed and unsigned total bend of three closed curves
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
  t.s = random(0.8, 1.1)
  t.pts = [(t.s * 80, t.s * 45), (t.s * 75.175, t.s * 65.521), (t.s * 61.284, t.s * 83.567), (t.s * 40, t.s * 96.962), (t.s * 13.892, t.s * 104.088), (t.s * -13.892, t.s * 104.088), (t.s * -40, t.s * 96.962), (t.s * -61.284, t.s * 83.567), (t.s * -75.175, t.s * 65.521), (t.s * -80, t.s * 45), (t.s * -75.175, t.s * 24.479), (t.s * -61.284, t.s * 6.433), (t.s * -40, t.s * -6.962), (t.s * -13.892, t.s * -14.088), (t.s * 13.892, t.s * -14.088), (t.s * 40, t.s * -6.962), (t.s * 61.284, t.s * 6.433), (t.s * 75.175, t.s * 24.479)]
  t.signed = totalCurvature(t.pts, true, true)
  t.unsigned = totalCurvature(t.pts, true, false)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #555555
    strokeWidth : 4
  }
  t.barS = Rectangle {
    center : (-150 + 25 * t.signed / 2, -105)
    width : 25 * abs(t.signed) + 1
    height : 18
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.barU = Rectangle {
    center : (-150 + 25 * t.unsigned / 2, -130)
    width : 25 * t.unsigned
    height : 18
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'convex loop',
      },
      {
        label: 'wavy loop',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(0.8, 1.1)
  t.pts = [(t.s * 89.7, t.s * 45), (t.s * 77.616, t.s * 57.194), (t.s * 53.579, t.s * 62.632), (t.s * 39.076, t.s * 65.984), (t.s * 39.245, t.s * 77.215), (t.s * 39.675, t.s * 95.792), (t.s * 27.719, t.s * 108.055), (t.s * 8.294, t.s * 103.329), (t.s * -6.131, t.s * 88.113), (t.s * -14.926, t.s * 78.953), (t.s * -29.325, t.s * 82.542), (t.s * -53.096, t.s * 88.585), (t.s * -72.569, t.s * 83.97), (t.s * -72.49, t.s * 68.855), (t.s * -57.368, t.s * 54.013), (t.s * -48.3, t.s * 45), (t.s * -57.368, t.s * 35.987), (t.s * -72.49, t.s * 21.145), (t.s * -72.569, t.s * 6.03), (t.s * -53.096, t.s * 1.415), (t.s * -29.325, t.s * 7.458), (t.s * -14.926, t.s * 11.047), (t.s * -6.131, t.s * 1.887), (t.s * 8.294, t.s * -13.329), (t.s * 27.719, t.s * -18.055), (t.s * 39.675, t.s * -5.792), (t.s * 39.245, t.s * 12.785), (t.s * 39.076, t.s * 24.016), (t.s * 53.579, t.s * 27.368), (t.s * 77.616, t.s * 32.806)]
  t.signed = totalCurvature(t.pts, true, true)
  t.unsigned = totalCurvature(t.pts, true, false)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #555555
    strokeWidth : 4
  }
  t.barS = Rectangle {
    center : (-150 + 25 * t.signed / 2, -105)
    width : 25 * abs(t.signed) + 1
    height : 18
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.barU = Rectangle {
    center : (-150 + 25 * t.unsigned / 2, -130)
    width : 25 * t.unsigned
    height : 18
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'figure eight',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(0.8, 1.1)
  t.pts = [(t.s * 0, t.s * 45), (t.s * 23.294, t.s * 75), (t.s * 45, t.s * 96.962), (t.s * 63.64, t.s * 105), (t.s * 77.942, t.s * 96.962), (t.s * 86.933, t.s * 75), (t.s * 90, t.s * 45), (t.s * 86.933, t.s * 15), (t.s * 77.942, t.s * -6.962), (t.s * 63.64, t.s * -15), (t.s * 45, t.s * -6.962), (t.s * 23.294, t.s * 15), (t.s * 0, t.s * 45), (t.s * -23.294, t.s * 75), (t.s * -45, t.s * 96.962), (t.s * -63.64, t.s * 105), (t.s * -77.942, t.s * 96.962), (t.s * -86.933, t.s * 75), (t.s * -90, t.s * 45), (t.s * -86.933, t.s * 15), (t.s * -77.942, t.s * -6.962), (t.s * -63.64, t.s * -15), (t.s * -45, t.s * -6.962), (t.s * -23.294, t.s * 15)]
  t.signed = totalCurvature(t.pts, true, true)
  t.unsigned = totalCurvature(t.pts, true, false)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #555555
    strokeWidth : 4
  }
  t.barS = Rectangle {
    center : (-150 + 25 * t.signed / 2, -105)
    width : 25 * abs(t.signed) + 1
    height : 18
    fillColor : #2f6fbf
    strokeWidth : 0
  }
  t.barU = Rectangle {
    center : (-150 + 25 * t.unsigned / 2, -130)
    width : 25 * t.unsigned
    height : 18
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
