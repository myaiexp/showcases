// onCanvas: keeping a shape inside the canvas
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    domain: `type Orange
type Frame
`,
    substance: `Orange A
Frame F
`,
    style: `-- (degenerate on purpose)
canvas {
  width = 600
  height = 450
}

forall Frame x {
  x.icon = Rectangle {
    center: (0, 0)
    width: canvas.width
    height: canvas.height
    fillColor: none()
    strokeColor: #6b7684
    strokeWidth: 6
    ensureOnCanvas: false
  }
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    ensureOnCanvas: false
    r: 70
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange a {
  encourage nearPt(a.icon, 400, 0)
}
`,
    variants: [
      {
        label: 'ensureOnCanvas off',
      },
      {
        label: 'onCanvas(a, w, h)',
        style: `canvas {
  width = 600
  height = 450
}

forall Frame x {
  x.icon = Rectangle {
    center: (0, 0)
    width: canvas.width
    height: canvas.height
    fillColor: none()
    strokeColor: #6b7684
    strokeWidth: 6
    ensureOnCanvas: false
  }
}

forall Orange x {
  x.icon = Circle {
    fillColor: #f0a04b66
    strokeColor: #c46f10
    strokeWidth: 3
    ensureOnCanvas: false
    r: 70
  }
  x.text = Text {
    string: nameof x
    center: x.icon.center
    fontSize: "20px"
  }
  layer x.text above x.icon
}

forall Orange a {
  encourage nearPt(a.icon, 400, 0)
  ensure onCanvas(a.icon, canvas.width, canvas.height)
}
`,
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
