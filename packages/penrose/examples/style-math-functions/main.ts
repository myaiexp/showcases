// sqrt, cos and sin turn the match number into a position
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const seeds = Array.from({ length: 40 }, (_, i) => `s${i + 1}`).join(', ');
  const style = (angle: string): string => `canvas {
  width = 420
  height = 420
}

forall Seed s {
  turn = match_id * ${angle}
  reach = 28 * sqrt(match_id)
  s.dot = Circle {
    center : (reach * cos(turn), reach * sin(turn))
    r : 6 + match_id / 8
    strokeWidth : 0.0
    fillColor : hsva(60 + 3 * match_id, 80, 95, 1.0)
  }
}
`;
  const golden = style('2.39996');
  playground(stage, {
    domain: `type Seed
`,
    substance: `Seed ${seeds}
NoLabel ${seeds}
`,
    style: golden,
    variants: [
      { label: 'angle 2.39996 (golden)', style: golden },
      { label: 'angle 2.0', style: style('2.0') },
      { label: 'angle 2.5', style: style('2.5') },
    ],
  });
  return () => stage.dispose();
};

export default mount;
