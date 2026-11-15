// hsva(h, s, v, a): one component sweeps across six swatches in each tab
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = (color: string): string => `canvas {
  width = 640
  height = 260
}

backdrop {
  stripe = Rectangle {
    center : (0, 0)
    width : 620
    height : 36
    fillColor : rgba(0.15, 0.15, 0.2, 1.0)
    strokeWidth : 0.0
  }
}

forall Swatch s {
  t = (match_id - 1) / (match_total - 1)
  s.box = Rectangle {
    center : (match_id * 100 - 350, 0)
    width : 84
    height : 120
    fillColor : ${color}
    strokeWidth : 0.0
  }
  layer backdrop.stripe below s.box
}
`;
  const hue = style('hsva(300 * t, 85, 95, 1.0)');
  playground(stage, {
    domain: `type Swatch
`,
    substance: `Swatch a, b, c, d, e, f
NoLabel a, b, c, d, e, f
`,
    style: hue,
    variants: [
      { label: 'hue 0 to 300', style: hue },
      { label: 'saturation 0 to 100', style: style('hsva(210, 100 * t, 95, 1.0)') },
      { label: 'value 0 to 100', style: style('hsva(30, 90, 100 * t, 1.0)') },
      { label: 'alpha 1 to 0.1', style: style('hsva(340, 85, 95, 1.0 - 0.9 * t)') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
