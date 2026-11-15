// The canvas preamble sets the drawing size; other blocks read it back
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (w: number, h: number): string => `canvas {
  width = ${w}
  height = ${h}
}

forall Set s {
  s.icon = Circle {
    strokeWidth : 0.0
    fillColor : rgba(0.4, 0.55, 0.9, 0.6)
  }
  ensure s.icon.r > canvas.height / 12
  ensure s.icon.r < canvas.height / 5
  s.text = Text {
    string : s.label
    fontSize : "${Math.round(h / 12)}px"
  }
  ensure contains(s.icon, s.text)
}

-- every pair of sets gets a frame the size of the canvas, read through the dot operator
forall Set a; Set b {
  frame = Rectangle {
    center : (0, 0)
    width : canvas.width - 12
    height : canvas.height - 12
    fillColor : none()
    strokeColor : rgba(0.2, 0.2, 0.2, 1.0)
    strokeWidth : 3.0
    strokeStyle : "dashed"
  }
  layer frame below a.icon
}
`;
  playground(stage, {
    domain: `type Set
`,
    substance: `Set A, B
AutoLabel All
`,
    style: style(400, 300),
    variants: [
      { label: 'canvas 400 × 300', style: style(400, 300) },
      { label: 'canvas 600 × 600', style: style(600, 600) },
      { label: 'canvas 800 × 450', style: style(800, 450) },
    ],
  });
  return () => stage.dispose();
};

export default mount;
