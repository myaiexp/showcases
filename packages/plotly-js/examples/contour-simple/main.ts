// A contour trace from a 100x100 grid of sin·cos·sin(r²)/log(r²+1), the wave drifting
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const size = 100;
const x = Array.from({ length: size }, (_, i) => -2 * Math.PI + (4 * Math.PI * i) / size);
const y = x;

/** The docs' surface; `shift` slides the sine factor along x so the card has something to show. */
function grid(shift: number): number[][] {
  return x.map((xi) =>
    y.map((yj) => {
      const r2 = xi * xi + yj * yj;
      return (Math.sin(xi + shift) * Math.cos(yj) * Math.sin(r2)) / Math.log(r2 + 1);
    }),
  );
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });

  await Plotly.newPlot(
    stage.div,
    [{ z: grid(0), x, y, type: 'contour' }],
    { template: stage.template },
    stage.config,
  );

  // z is the docs' z[i][j] with i over x, so Plotly draws x on the vertical here, as the docs do.
  if (stage.preview) {
    stage.every(160, (i) => void restyle(stage.div, { z: [grid(i * 0.25)] }, [0]));
  }

  return () => stage.dispose();
};

export default mount;
