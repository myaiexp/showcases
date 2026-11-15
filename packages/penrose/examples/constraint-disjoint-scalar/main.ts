// disjointScalar: a coordinate kept out of a range
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Orange
type Band
`,
    substance: `Orange A
Band R
`,
    style: `canvas {
  width = 600
  height = 450
}

forall Band x {
  x.icon = Rectangle {
    center: (0, 0)
    width: 200
    height: 420
    fillColor: #58b96a40
    strokeColor: #2e8a41
    strokeWidth: 2
  }
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 30
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange a {
  encourage nearPt(a.icon, 0, 0)
}
`,
    variants: [
      {
        label: 'Only a pull to the middle',
      },
      {
        label: 'disjointScalar(x, -100, 100)',
        style: `canvas {
  width = 600
  height = 450
}

forall Band x {
  x.icon = Rectangle {
    center: (0, 0)
    width: 200
    height: 420
    fillColor: #58b96a40
    strokeColor: #2e8a41
    strokeWidth: 2
  }
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    r: 30
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange a {
  encourage nearPt(a.icon, 0, 0)
  ensure disjointScalar(a.icon.center[0], -100, 100)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
