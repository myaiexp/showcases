// Reserved variables tell a block which match it is and how many there are
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const style = `canvas {
  width = 640
  height = 300
}

forall Dot d {
  step = canvas.width / (match_total + 1)
  d.icon = Circle {
    center : (match_id * step - canvas.width / 2, 0)
    r : 10 + 22 * match_id / match_total
    strokeWidth : 0.0
    fillColor : hsva(300 * match_id / match_total, 70, 95, 1.0)
  }
  d.text = Text {
    string : nameof d
    center : (d.icon.center[0], 0 - 80)
    fontSize : "24px"
  }
}
`;
  playground(stage, {
    domain: `type Dot
`,
    substance: `Dot a, b, c
`,
    style,
    variants: [
      { label: '3 matches', style },
      { label: '5 matches', substance: `Dot a, b, c, d, e\n`, style },
      { label: '8 matches', substance: `Dot a, b, c, d, e, f, g, h\n`, style },
    ],
  });
  return () => stage.dispose();
};

export default mount;
