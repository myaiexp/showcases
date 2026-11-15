// How many times the tangent turns, marked on a number line
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
  t.s = random(0.8, 1.15)
  t.pts = [(t.s * 90, t.s * 10), (t.s * 84.572, t.s * 30.521), (t.s * 68.944, t.s * 48.567), (t.s * 45, t.s * 61.962), (t.s * 15.628, t.s * 69.088), (t.s * -15.628, t.s * 69.088), (t.s * -45, t.s * 61.962), (t.s * -68.944, t.s * 48.567), (t.s * -84.572, t.s * 30.521), (t.s * -90, t.s * 10), (t.s * -84.572, t.s * -10.521), (t.s * -68.944, t.s * -28.567), (t.s * -45, t.s * -41.962), (t.s * -15.628, t.s * -49.088), (t.s * 15.628, t.s * -49.088), (t.s * 45, t.s * -41.962), (t.s * 68.944, t.s * -28.567), (t.s * 84.572, t.s * -10.521)]
  t.tn = turningNumber(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #2f6fbf
    strokeWidth : 4
  }
  t.scale = Line {
    start : (-150, -125)
    end : (150, -125)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.tick0 = Line {
    start : (-120, -118)
    end : (-120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n0 = Text {
    string : "-2"
    center : (-120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick1 = Line {
    start : (-60, -118)
    end : (-60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n1 = Text {
    string : "-1"
    center : (-60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick2 = Line {
    start : (0, -118)
    end : (0, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n2 = Text {
    string : "0"
    center : (0, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick3 = Line {
    start : (60, -118)
    end : (60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n3 = Text {
    string : "1"
    center : (60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick4 = Line {
    start : (120, -118)
    end : (120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n4 = Text {
    string : "2"
    center : (120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.marker = Circle {
    center : (60 * t.tn, -125)
    r : 9
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
    variants: [
      {
        label: 'loop, counterclockwise',
      },
      {
        label: 'loop, clockwise',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(0.8, 1.15)
  t.pts = [(t.s * 90, t.s * 10), (t.s * 84.572, t.s * -10.521), (t.s * 68.944, t.s * -28.567), (t.s * 45, t.s * -41.962), (t.s * 15.628, t.s * -49.088), (t.s * -15.628, t.s * -49.088), (t.s * -45, t.s * -41.962), (t.s * -68.944, t.s * -28.567), (t.s * -84.572, t.s * -10.521), (t.s * -90, t.s * 10), (t.s * -84.572, t.s * 30.521), (t.s * -68.944, t.s * 48.567), (t.s * -45, t.s * 61.962), (t.s * -15.628, t.s * 69.088), (t.s * 15.628, t.s * 69.088), (t.s * 45, t.s * 61.962), (t.s * 68.944, t.s * 48.567), (t.s * 84.572, t.s * 30.521)]
  t.tn = turningNumber(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #c0392b
    strokeWidth : 4
  }
  t.scale = Line {
    start : (-150, -125)
    end : (150, -125)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.tick0 = Line {
    start : (-120, -118)
    end : (-120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n0 = Text {
    string : "-2"
    center : (-120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick1 = Line {
    start : (-60, -118)
    end : (-60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n1 = Text {
    string : "-1"
    center : (-60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick2 = Line {
    start : (0, -118)
    end : (0, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n2 = Text {
    string : "0"
    center : (0, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick3 = Line {
    start : (60, -118)
    end : (60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n3 = Text {
    string : "1"
    center : (60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick4 = Line {
    start : (120, -118)
    end : (120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n4 = Text {
    string : "2"
    center : (120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.marker = Circle {
    center : (60 * t.tn, -125)
    r : 9
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
  t.s = random(0.8, 1.15)
  t.pts = [(t.s * 0, t.s * 10), (t.s * 25.882, t.s * 40), (t.s * 50, t.s * 61.962), (t.s * 70.711, t.s * 70), (t.s * 86.603, t.s * 61.962), (t.s * 96.593, t.s * 40), (t.s * 100, t.s * 10), (t.s * 96.593, t.s * -20), (t.s * 86.603, t.s * -41.962), (t.s * 70.711, t.s * -50), (t.s * 50, t.s * -41.962), (t.s * 25.882, t.s * -20), (t.s * 0, t.s * 10), (t.s * -25.882, t.s * 40), (t.s * -50, t.s * 61.962), (t.s * -70.711, t.s * 70), (t.s * -86.603, t.s * 61.962), (t.s * -96.593, t.s * 40), (t.s * -100, t.s * 10), (t.s * -96.593, t.s * -20), (t.s * -86.603, t.s * -41.962), (t.s * -70.711, t.s * -50), (t.s * -50, t.s * -41.962), (t.s * -25.882, t.s * -20)]
  t.tn = turningNumber(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #7a4fbf
    strokeWidth : 4
  }
  t.scale = Line {
    start : (-150, -125)
    end : (150, -125)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.tick0 = Line {
    start : (-120, -118)
    end : (-120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n0 = Text {
    string : "-2"
    center : (-120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick1 = Line {
    start : (-60, -118)
    end : (-60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n1 = Text {
    string : "-1"
    center : (-60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick2 = Line {
    start : (0, -118)
    end : (0, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n2 = Text {
    string : "0"
    center : (0, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick3 = Line {
    start : (60, -118)
    end : (60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n3 = Text {
    string : "1"
    center : (60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick4 = Line {
    start : (120, -118)
    end : (120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n4 = Text {
    string : "2"
    center : (120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.marker = Circle {
    center : (60 * t.tn, -125)
    r : 9
    fillColor : #c0392b
    strokeWidth : 0
  }
}
`,
      },
      {
        label: 'loop with an inner loop',
        style: `canvas {
  width = 400
  height = 300
}

forall Thing t {
  t.s = random(0.8, 1.15)
  t.pts = [(t.s * 105, t.s * 10), (t.s * 100.656, t.s * 32.974), (t.s * 88.356, t.s * 52.55), (t.s * 70.152, t.s * 65.945), (t.s * 49.034, t.s * 71.487), (t.s * 28.364, t.s * 68.898), (t.s * 11.254, t.s * 59.308), (t.s * 0, t.s * 45), (t.s * -4.322, t.s * 28.937), (t.s * -2.008, t.s * 14.17), (t.s * 5.39, t.s * 3.242), (t.s * 15.424, t.s * -2.3), (t.s * 25.288, t.s * -2.178), (t.s * 32.411, t.s * 2.602), (t.s * 35, t.s * 10), (t.s * 32.411, t.s * 17.398), (t.s * 25.288, t.s * 22.178), (t.s * 15.424, t.s * 22.3), (t.s * 5.39, t.s * 16.758), (t.s * -2.008, t.s * 5.83), (t.s * -4.322, t.s * -8.937), (t.s * 0, t.s * -25), (t.s * 11.254, t.s * -39.308), (t.s * 28.364, t.s * -48.898), (t.s * 49.034, t.s * -51.487), (t.s * 70.152, t.s * -45.945), (t.s * 88.356, t.s * -32.55), (t.s * 100.656, t.s * -12.974)]
  t.tn = turningNumber(t.pts, true)
  t.curve = Polygon {
    points : t.pts
    fillColor : none()
    strokeColor : #2e8b57
    strokeWidth : 4
  }
  t.scale = Line {
    start : (-150, -125)
    end : (150, -125)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.tick0 = Line {
    start : (-120, -118)
    end : (-120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n0 = Text {
    string : "-2"
    center : (-120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick1 = Line {
    start : (-60, -118)
    end : (-60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n1 = Text {
    string : "-1"
    center : (-60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick2 = Line {
    start : (0, -118)
    end : (0, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n2 = Text {
    string : "0"
    center : (0, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick3 = Line {
    start : (60, -118)
    end : (60, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n3 = Text {
    string : "1"
    center : (60, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.tick4 = Line {
    start : (120, -118)
    end : (120, -132)
    strokeWidth : 2
    strokeColor : #999999
  }
  t.n4 = Text {
    string : "2"
    center : (120, -105)
    fontSize : "18px"
    fillColor : #777777
  }
  t.marker = Circle {
    center : (60 * t.tn, -125)
    r : 9
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
